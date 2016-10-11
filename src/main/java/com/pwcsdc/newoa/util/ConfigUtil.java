package com.pwcsdc.newoa.util;

import org.apache.log4j.Logger;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConfigUtil {

    static Logger logger = Logger.getLogger(ConfigUtil.class);

    private static Properties properties = new Properties();

    public synchronized static void loadPropertiesFile(String fileName) {
        Properties prop = null;
        try {
            InputStream in = Object.class.getResourceAsStream("/"+fileName);
            prop = new Properties();
            prop.load(in);
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        }
        if (prop != null) {
            properties.putAll(prop);
        }
    }

    public static String get(String name) {
        if (name == null) {
            return null;
        }
        return properties.getProperty(name);
    }

    public static String get(String name, String def) {
        String val = get(name);
        return val != null ? val : def;
    }

    public static int getInt(String name) {
        String val = get(name);
        return val == null ? 0 : Integer.parseInt(val);
    }

    public static int getInt(String name, int def) {
        String val = get(name);
        return val != null ? Integer.parseInt(val) : def;
    }

    public static long getLong(String name) {
        String val = get(name);
        return val == null ? 0L : Long.parseLong(val);
    }

    public static long getLong(String name, long def) {
        String val = get(name);
        return val != null ? Long.parseLong(val) : def;
    }

    public static boolean getBool(String name) {
        String val = get(name);
        return val == null ? false : Boolean.parseBoolean(val);
    }

    public static boolean getBool(String name, boolean def) {
        String val = get(name);
        return val != null ? Boolean.parseBoolean(val) : def;
    }

    public static float getFloat(String name) {
        String val = get(name);
        return val == null ? 0 : Float.parseFloat(val);
    }

    public static float getFloat(String name, float def) {
        String val = get(name);
        return val != null ? Float.parseFloat(val) : def;
    }

    public static double getDouble(String name) {
        String val = get(name);
        return val == null ? 0 : Double.parseDouble(val);
    }

    public static double getDouble(String name, double def) {
        String val = get(name);
        return val != null ? Double.parseDouble(val) : def;
    }

}
