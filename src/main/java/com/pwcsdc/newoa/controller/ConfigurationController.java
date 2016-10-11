package com.pwcsdc.newoa.controller;

import com.pwcsdc.newoa.dao.ConfigurationDao;
import com.pwcsdc.newoa.model.Configuration;
import com.pwcsdc.newoa.service.ConfigurationService;
import com.pwcsdc.newoa.util.BaseAction;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Controller
@RequestMapping(value = "/configuration")


public class ConfigurationController extends BaseAction {

    @Autowired
    private ConfigurationDao configurationDaoImpl;

    @Autowired
    private ConfigurationService configurationServiceImpl;


    private static final Logger logger = Logger.getLogger(ConfigurationController.class);

    @RequestMapping(value = "/addConfiguration", consumes = APPLICATION_JSON, method = RequestMethod.POST)
    public
    @ResponseBody
    Object addConfiguration(@RequestBody Configuration configuration) {
        configurationDaoImpl.saveConfiguration(configuration);
        return successReturnObject("Add Successfully");
    }

    @RequestMapping(value = "/findConfiguration")
    public
    @ResponseBody
    Object findConfiguration() {
        List configuration = null;
        try {
            configuration = configurationServiceImpl.getAllConfigurations();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
//        List configuration = configurationDaoImpl.getAllConfigurations();
        return successReturnObject(configuration);
    }

    @RequestMapping(value = "/deleteConfiguration", consumes = APPLICATION_JSON, method = RequestMethod.POST)
    public
    @ResponseBody
    Object deleteConfiguration(@RequestBody String id) {
        configurationDaoImpl.deleteConfiguration(id);
        return successReturnObject("Delete Successfully");
    }

    @RequestMapping(value = "/updateConfiguration", consumes = APPLICATION_JSON, method = RequestMethod.POST)
    public
    @ResponseBody
    Object updateConfiguration(@RequestBody Configuration configuration) {
        configurationDaoImpl.updateConfiguration(configuration);
        return successReturnObject("Update Successfully");
    }

    @RequestMapping(value = "/getConfiguration", consumes = APPLICATION_JSON, method = RequestMethod.POST)
    public
    @ResponseBody
    List<Configuration> getConfiguration() {
        return configurationDaoImpl.getAllConfigurations();

    }

    @RequestMapping(value = "/getConfigurationByLabel", consumes = APPLICATION_JSON, method = RequestMethod.POST)
    public
    @ResponseBody
    Configuration getConfigurationByType(@RequestBody String label) {
        logger.info("The type is:" + label);
        return configurationDaoImpl.getConfigurationByLabel(label);

    }
}


