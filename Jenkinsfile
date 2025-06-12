pipeline{
    agent any 
    environment{
        SONAR_HOME = tool "Sonar"
    }
    stages{
        stage("Code Checkout"){
            steps{
                git branch: 'main', url: 'https://github.com/nilbhungaliya/CourseBotics-AI-Powered-Course-Creator.git'
            }
        }
        
        stage("SonarQube Analysis"){
            steps{
                withSonarQubeEnv("Sonar"){
                    sh "${SONAR_HOME}/bin/sonar-scanner -Dsonar-projectName=CourseBotics-AI-Powered-Course-Creator -Dsonar.projectKey=CourseBotics-AI-Powered-Course-Creator"
                }
            }
        }

        stage("Sonar Quality Gate scan"){
            steps{
                timeout(time: 10, unit: 'MINUTES'){
                    waitForQualityGate abortPipeline: false
                }
            }
        }
        
        stage("OWASP Dependency Check"){
            steps{
                dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'dc'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
        
        stage("Trivy Security Scan"){
            steps{
                script{
                    // Scan filesystem for vulnerabilities
                    sh 'trivy fs --format table --output trivy-fs-report.html .'
                    
                    // Build Docker image for scanning
                    sh 'echo "$SUDO_PASSWORD" | sudo -S docker build -t coursebotics-app:latest .'
                    
                    // Scan Docker image for vulnerabilities
                    sh 'trivy image --format table --output trivy-image-report.html coursebotics-app:latest'
                }
            }
        }
        
        stage("Deploy"){
            steps{
                script{
                    // Deploy using docker-compose
                    sh 'echo "$SUDO_PASSWORD" | sudo -S docker-compose up -d'
                }
            }
        }
    }
    
    post{
        always{
            // Archive security reports
            archiveArtifacts artifacts: '**/trivy-*.html, **/dependency-check-report.xml', allowEmptyArchive: true
        }
        success{
            echo 'Pipeline completed successfully!'
        }
        failure{
            echo 'Pipeline failed!'
        }
    }
}