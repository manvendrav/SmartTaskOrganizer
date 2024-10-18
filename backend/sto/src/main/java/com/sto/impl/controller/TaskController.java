package com.sto.impl.controller;

import com.sto.impl.pojo.Task;
import com.sto.impl.dto.TaskDTO;
import com.sto.impl.service.TaskRepository;
import com.sto.impl.service.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class TaskController {

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    private TaskRepository taskRepository;

    private TaskService taskService;

    @Autowired
    public TaskController(TaskRepository taskRepository, TaskService taskService) {
        this.taskRepository = taskRepository;
        this.taskService = taskService;
    }

    @PostMapping("/createTask")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task createdTask = taskRepository.save(task);
        return ResponseEntity.ok(createdTask);
    }

    @GetMapping("/getTasks")
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        List<TaskDTO> tasks = taskService.getAllTasks();
        tasks.stream()
                .forEach(task -> logger.info("Task ID: {}", task.getId()));
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/updateTask")
    public ResponseEntity<String> updateTask(@RequestBody TaskDTO taskDTO) {
        // Assume the taskDTO has an ID field to identify which task to update
        taskService.updateTask(taskDTO);
        return ResponseEntity.ok("Task updated successfully");
    }

    @DeleteMapping("/deleteTask/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task deleted successfully");
    }



}

