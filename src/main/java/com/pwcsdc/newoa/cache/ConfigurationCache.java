package com.pwcsdc.newoa.cache;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.pwcsdc.newoa.controller.ConfigurationController;
import com.pwcsdc.newoa.dao.ConfigurationDao;
import com.pwcsdc.newoa.model.Configuration;
import com.pwcsdc.newoa.util.ConfigUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

/**
 * Created by fzhang090 on 10/11/2016.
 */
@Component
public class ConfigurationCache {

    private static final Logger logger = Logger.getLogger(ConfigurationController.class);


    @Autowired
    private ConfigurationDao configurationDaoImpl;

//    static {
//        ConfigUtil.loadPropertiesFile("configuration.properties");
//    }

    private static long autoCacheSize = ConfigUtil.getLong("autoCacheSize", 100 * 1000);
    private static long expireAfterAccessTime = ConfigUtil.getLong("expireAfterAccessTime", 60);
    private static long expireAfterWriteTime = ConfigUtil.getLong("expireAfterWriteTime", 60);
    private static String cachekey = ConfigUtil.get("cacheKey", "OA");

    private LoadingCache<String, List<Configuration>> configurationCache = CacheBuilder.newBuilder().concurrencyLevel(8)
            .maximumSize(autoCacheSize).expireAfterAccess(expireAfterAccessTime, TimeUnit.MINUTES)
            .expireAfterWrite(expireAfterWriteTime, TimeUnit.MINUTES).recordStats()
            .build(new CacheLoader<String, List<Configuration>>() {
                @Override
                public List<Configuration> load(String key) throws Exception {
                    return suggest();
                }
            });

    private List<Configuration> suggest() {
        return configurationDaoImpl.getAllConfigurations();
    }

    public List<Configuration> getConfigurationCache() {
        List<Configuration> response = new ArrayList<Configuration>();

        try {
            response = configurationCache.get(cachekey);
        } catch (ExecutionException e) {
            logger.error("get cache error", e);
        }
        return response;
    }

}
