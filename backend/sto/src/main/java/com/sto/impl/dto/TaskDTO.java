package com.sto.impl.dto;

public class TaskDTO {
    private String name;
    private String description;
    private String dueDate;
    private Long id;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
