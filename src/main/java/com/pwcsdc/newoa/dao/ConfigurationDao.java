package com.pwcsdc.newoa.dao;

import java.util.List;

import com.mongodb.WriteResult;
import com.pwcsdc.newoa.model.Configuration;

/**
 * Created by fzhang090 on 9/23/2016.
 */
public interface ConfigurationDao {

    public List<Configuration> getAllConfigurations();
    
    public Configuration getConfigurationBy(String module, String table);

    public Configuration getConfigurationByLabel(String lable);
    
    public void saveConfiguration(Configuration configuration);

    public Configuration getConfiguration(String id);

    public WriteResult updateConfiguration(Configuration configuration);

    public void deleteConfiguration(String id);
}
