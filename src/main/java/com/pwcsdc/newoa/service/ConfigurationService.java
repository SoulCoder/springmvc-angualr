package com.pwcsdc.newoa.service;

import com.pwcsdc.newoa.model.Configuration;

import java.util.List;
import java.util.concurrent.ExecutionException;

/**
 * Created by fzhang090 on 10/11/2016.
 */
public interface ConfigurationService {

    List<Configuration> getAllConfigurations() throws ExecutionException;
}
