package com.pwcsdc.newoa.util;

import java.util.HashMap;
import java.util.Map;


public class BaseAction {


    public static final String APPLICATION_JSON = "application/json";


    protected Object successReturnObject(Object object) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("code", "0");
        map.put("data", object);
        return map;
    }

    protected Object successReturnObject(Object object, int num) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("data", object);
        map.put("total", num);
        map.put("code", "0");
        return map;
    }

    protected Object failReturnObject(Object object) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("code", "-1");
        map.put("data", object);
        return map;
    }
}

