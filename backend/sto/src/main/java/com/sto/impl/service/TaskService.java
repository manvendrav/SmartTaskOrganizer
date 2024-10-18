package com.sto.impl.service;

import com.sto.impl.pojo.Task;
import com.sto.impl.dto.TaskDTO;
import com.sto.impl.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<TaskDTO> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return tasks.stream().map(this::convertToDTO).toList();
    }

    private TaskDTO convertToDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setName(task.getTaskName());
        dto.setDescription(task.getDescription());
        dto.setDueDate(task.getDueDate());
        dto.setId(task.getId());
        return dto;
    }

    public Task updateTask(TaskDTO taskDTO) {
        Task existingTask = taskRepository.findById(taskDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        existingTask.setTaskName(taskDTO.getName());
        existingTask.setDescription(taskDTO.getDescription());
        existingTask.setDueDate(taskDTO.getDueDate());

        return taskRepository.save(existingTask);
    }

    public void deleteTask(Long id) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        taskRepository.delete(existingTask);
    }

}

