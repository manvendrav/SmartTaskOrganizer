pipeline {
    agent any

    environment {
        NODE_HOME = '/usr/local/node'
        JAVA_HOME = '/usr/lib/jvm/java-11-openjdk'
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'frontend'
    }

    stages {
        stage('Prepare') {
            steps {
                script {
                    // Ensure tools are available
                    env.PATH = "${NODE_HOME}/bin:${JAVA_HOME}/bin:${env.PATH}"
                }
            }
        }

        stage('Checkout Code') {
            steps {
                git(
                    url: 'https://github.com/manvendrav/SmartTaskOrganizer.git',
                    branch: 'main'
                )
            }
        }

        stage('Build Backend') {
            steps {
                dir(BACKEND_DIR) {
                    // Build the Spring Boot application
                    sh '''
                        ./mvnw clean package  // Make sure the Maven wrapper is executable
                    '''
                }
            }
        }

        // ... rest of your stages ...
    }

    post {
        always {
            echo 'Cleaning up...'
            cleanWs()
        }

        success {
            echo 'Build and deployment succeeded!'
        }

        failure {
            echo 'Build or deployment failed.'
        }
    }
}
