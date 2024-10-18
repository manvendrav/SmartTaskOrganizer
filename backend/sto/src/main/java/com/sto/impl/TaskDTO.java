package com.sto.impl;

public class TaskDTO {
    private String name;
    private String description;
    private String dueDate;

    public String getName() {
        return name;
    }

    public TaskDTO setName(String name) {
        this.name = name;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public TaskDTO setDescription(String description) {
        this.description = description;
        return this;
    }

    public String getDueDate() {
        return dueDate;
    }

    public TaskDTO setDueDate(String dueDate) {
        this.dueDate = dueDate;
        return this;
    }
}
