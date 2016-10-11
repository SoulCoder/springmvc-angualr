package com.pwcsdc.newoa.service.impl;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.pwcsdc.newoa.cache.ConfigurationCache;
import com.pwcsdc.newoa.dao.ConfigurationDao;
import com.pwcsdc.newoa.model.Configuration;
import com.pwcsdc.newoa.service.ConfigurationService;
import com.pwcsdc.newoa.util.ConfigUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

/**
 * Created by fzhang090 on 10/11/2016.
 */
@Service
public class ConfigurationServiceImpl implements ConfigurationService {

    @Autowired
    private ConfigurationCache configurationCache;


    @Override
    public List<Configuration> getAllConfigurations() {
        return configurationCache.getConfigurationCache();
    }


}
