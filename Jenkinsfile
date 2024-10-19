pipeline {
    agent any 
    
    stages {
        stage('Checkout') {
            steps {
                // Check out the code from your GitHub repository
                checkout scm
            }
        }
        stage('Prepare Backend') {
            steps {
                script {
                    // Change to the backend directory
                    dir('backend') {
                        // Make the Maven wrapper executable
                        sh 'chmod +x mvnw'
                    }
                }
            }
        }
        stage('Build Backend') {
            steps {
                script {
                    // Change to the backend directory and build
                    dir('backend') {
                        // Run the Maven build using the Maven Wrapper
                        sh './mvnw clean package'
                    }
                }
            }
        }
        stage('Test Backend') {
            steps {
                script {
                    // Change to the backend directory and run tests
                    dir('backend') {
                        sh './mvnw test'
                    }
                }
            }
        }
        stage('Prepare Frontend') {
            steps {
                script {
                    // Change to the frontend directory
                    dir('frontend') {
                        // Install dependencies (assuming you're using npm or yarn)
                        sh 'npm install' // or use 'yarn install' if applicable
                    }
                }
            }
        }
        stage('Build Frontend') {
            steps {
                script {
                    // Change to the frontend directory and build
                    dir('frontend') {
                        sh 'npm run build' // Adjust if your build script is different
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Deploy your application here
                    // Example: Deploy backend JAR and frontend build files
                    // You may use SSH, SCP, or any other method
                    echo 'Deploying backend and frontend...'
                }
            }
        }
    }
    post {
        success {
            // Actions on successful build
            echo 'Build and tests were successful!'
        }
        failure {
            // Actions on failed build
            echo 'Build or tests failed.'
        }
        always {
            // Cleanup actions if necessary
            cleanWs() // Clean the workspace
        }
    }
}
