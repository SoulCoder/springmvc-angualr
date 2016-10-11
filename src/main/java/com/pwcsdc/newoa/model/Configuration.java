package com.pwcsdc.newoa.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Created by fzhang090 on 9/23/2016.
 */
@Document
public class Configuration {
    @Id
    private String id;

    private Element module;

    private Element table;

    private List<Element> fields;

    private List<String> roles;
    
    private List<AuditProcess> steps;

	public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Element getModule() {
        return module;
    }

    public void setModule(Element module) {
        this.module = module;
    }

    public Element getTable() {
        return table;
    }

    public void setTable(Element table) {
        this.table = table;
    }

    public List<Element> getFields() {
        return fields;
    }

    public void setFields(List<Element> fields) {
        this.fields = fields;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public List<AuditProcess> getSteps() {
		return steps;
	}

	public void setSteps(List<AuditProcess> steps) {
		this.steps = steps;
	}
}