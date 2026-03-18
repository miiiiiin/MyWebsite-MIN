import React from 'react';
import './About.css';

const About = () => {
  const skillGroups = [
    { title: 'Backend', skills: ['Java', 'Spring', 'Spring Boot', 'JPA'] },
    { title: 'Infra', skills: ['Docker', 'AWS EC2', 'ECS', 'RDS', 'MSK Serverless'] },
    { title: 'Mobile', skills: ['Swift', 'RxSwift', 'iOS', 'Fastlane'] },
    { title: 'ETC', skills: ['Git', 'Github', 'Jira/Confluence'] }
  ];

  return (
    <section className="about container" id="about">
      <div className="section-header">
        <h2 className="accent">About Me</h2>
        <div className="line"></div>
      </div>

      <div className="about-grid">
        <div className="about-main glass-panel">
          <h3>Introduce</h3>
          <p>
            차량 주차대행 서비스 업체인 <strong>(주)마지막삼십분</strong>에서 iOS 개발자로 근무하며 제품 기획 초기부터 출시 및 유지보수까지 (A to Z) 담당해온 경험이 있습니다. 
          </p>
          <p>
            현재는 개인 역량 강화를 위해 컴퓨터공학과로 편입 및 졸업 후 <strong>백엔드 개발 역량</strong>을 집중적으로 쌓고 있습니다. 
            문제 해결과 기술 학습 과정에서 주도적으로 구조적 고민을 하고 체계적인 코드를 작성하는 것을 중요시합니다. 
            생산성, 원활한 유지보수를 위한 유연성을 갖춘 코드 설계에 관심이 많습니다.
          </p>
        </div>

        <div className="about-side">
          <div className="experience glass-panel">
            <h3>Career</h3>
            <div className="exp-item">
              <div className="exp-info">
                <h4>iOS Developer</h4>
                <p className="accent">(주)마지막삼십분 | 2019.09 ~ 2022.05</p>
              </div>
              <p className="exp-desc">
                서비스명: <strong>잇차-주차대행 서비스</strong> (<a href="https://itcha.co.kr/" target="_blank" rel="noreferrer">itcha.co.kr</a>) <br />
                모바일 앱 기반의 실시간 주차대행 및 예약 서비스입니다. 초기 멤버로 합류하여 서비스 출시의 전 과정을 경험했습니다.
              </p>
            </div>
          </div>

          <div className="education glass-panel">
            <h3>Education</h3>
            <div className="edu-item">
              <p><strong>강원대학교</strong> | 2023.03 ~ 2025.08</p>
              <p className="text-muted">컴퓨터공학과 졸업</p>
            </div>
            <div className="edu-item">
              <p><strong>인덕대학교</strong> | 2016.03 ~ 2019.02</p>
              <p className="text-muted">컴퓨터소프트웨어학과 졸업</p>
            </div>
          </div>
        </div>
      </div>

      <div className="skills-section">
        <h3>Technical Skills</h3>
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <div key={index} className="skill-card glass-panel">
              <h4 className="accent">{group.title}</h4>
              <div className="skill-list">
                {group.skills.map((skill, sIndex) => (
                  <span key={sIndex} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
