import Image from "next/image";
import NavBar from "../components/NavBar";
import styles from "./page.module.css";

const About = () => {
    const skills = [
        "Java",
        "Python",
        "SQL",
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "ReactJS",
        "Socket.io",
        "NodeJS",
        "Firebase",
        "REST API",
        "Git",
        "Github",
        "Docker"
      ];

      const profiles = [
        ["Linked IN","https://www.linkedin.com/in/sundeep-reddy-nallamilli-270a0119b/","/linkedin.svg"],
        ["GitHub","https://github.com/just-breathing","/github.svg"]
      ]
      
    return ( 

        <div className={styles.about} >
        <NavBar />
        <div  className={styles.mainSection} >
            <div className={styles.section}>
                <p>Hi My name is <span className={styles.identity} >Sundeep</span></p>
                <p>I am a recent MSCS Grad interested in Fullstack development roles</p>
            </div>
            <div className={styles.section} >
                <h4>Summary : </h4>
   
                <p className={styles.summ} >
                    I thrive as a creative problem solver with excellent communication skills, both written and verbal. I am driven by a passion for learning and a deep commitment to making a positive impact in our ever- evolving world. My greatest strength lies in my enthusiasm for tackling new challenges and leveraging my technical, interpersonal, and management skills to contribute to the growth of an organization.
                </p>
            </div>
            <div className={styles.section} >
               <h4>Skills : </h4> 
            </div>
            <div className={styles.skillsWrap} >
                {skills.map((skill,idx)=>{
                       return <div className={styles.skill} key={idx} >{skill}</div>
                })}
            </div>
            <div className={`${styles.section} ${styles.footer}`}>
                    <div>Profiles : </div>
                    <div className={styles.profiles} >
                        {
                            profiles.map((profile,idx)=>{
                               return (
                                <a href={profile[1]} target="_blank" key={idx}  >
                                <div className={styles.profile} >
                                    <Image src={profile[2]} width={20} height={20}  alt={`${profile[0]} profile`}/>
                                    <label>{profile[0]}</label>
                                </div>
                                </a>

                               ) 
                            })
                        }
                    </div>
            </div>
        </div>
        </div>


     );
}
 
export default About;