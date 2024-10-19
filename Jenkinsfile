pipeline {
    agent any

    environment {
        // Define environment variables like JAVA_HOME or Node.js path
        NODE_HOME = '/usr/local/node'
        JAVA_HOME = '/usr/lib/jvm/java-17-openjdk-amd64'
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'frontend'
    }

    stages {
        stage('Prepare') {
            steps {
                script {
                    // Ensure tools are available (Node, Java, etc.)
                    env.PATH = "${NODE_HOME}/bin:${JAVA_HOME}/bin:${env.PATH}"
                }
            }
        }

        stage('Checkout Code') {
            steps {
                // Clone your code repository
                git 'https://github.com/manvendrav/SmartTaskOrganizer.git'
            }
        }

        stage('Build Frontend') {
            steps {
                dir(FRONTEND_DIR) {
                    echo 'Building the React frontend...'
                    sh 'npm install'
                    sh 'npm run build' // Produces the production build
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir(BACKEND_DIR) {
                    echo 'Building the Spring Boot backend...'
                    sh './mvnw clean install' // Or mvn clean install if Maven is globally installed
                }
            }
        }

        stage('Run Unit Tests') {
            parallel {
                stage('Frontend Tests') {
                    steps {
                        dir(FRONTEND_DIR) {
                            echo 'Running frontend tests...'
                            sh 'npm run test' // Executes tests for the frontend
                        }
                    }
                }
                stage('Backend Tests') {
                    steps {
                        dir(BACKEND_DIR) {
                            echo 'Running backend tests...'
                            sh './mvnw test' // Or mvn test
                        }
                    }
                }
            }
        }

        stage('Package Artifacts') {
            steps {
                echo 'Packaging both frontend and backend...'
                dir(FRONTEND_DIR) {
                    // Assuming the build creates a 'build' folder with production assets
                    archiveArtifacts artifacts: 'build/**/*', allowEmptyArchive: true
                }
                dir(BACKEND_DIR) {
                    // Assuming the backend creates a JAR file
                    archiveArtifacts artifacts: 'target/*.jar', allowEmptyArchive: true
                }
            }
        }

        /*stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // You can use different deploy strategies here depending on your infrastructure
                // This is an example of copying to an SSH server for deployment
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'deploy-server-config',
                            transfers: [
                                sshTransfer(sourceFiles: 'frontend/build/**', remoteDirectory: '/var/www/html/', removePrefix: 'frontend/build'),
                                sshTransfer(sourceFiles: 'backend/target/*.jar', remoteDirectory: '/opt/backend/', removePrefix: 'backend/target')
                            ]
                        )
                    ]
                )
            }
        }*/
    }

    post {
        always {
            echo 'Cleaning up...'
            cleanWs() // Clean the workspace after the build
        }

        success {
            echo 'Build and deployment succeeded!'
        }

        failure {
            echo 'Build or deployment failed.'
        }
    }
}
