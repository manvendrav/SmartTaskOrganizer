package com.sto.impl.service;

import com.sto.impl.pojo.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}

