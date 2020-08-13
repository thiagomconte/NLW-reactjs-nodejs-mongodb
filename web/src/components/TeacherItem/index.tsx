import React from "react";
import whatsAppIcon from "../../assets/images/icons/whatsapp.svg";
import "./styles.css";
import api from "../../api/api";

export interface Teacher {

  _id: string,
  class_id: {
      _id: string,
      user_id: {
          _id: string,
          name: string,
          avatar:string,
          whatsapp: string,
          bio: string,
          __v: number
      },
      subject: string,
      cost: number,
      __v: number
  },
  week_day: number,
  from: number,
  to: number,
  __v: number
}

interface TeacherItemProps {
  teacher: Teacher;
}
const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

    function createNewConnection(){
        api.post('/connections/create',{
            user_id: teacher.class_id.user_id._id
        })
    }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.class_id.user_id.avatar} alt={teacher.class_id.user_id.name} />
        <div>
          <strong>{teacher.class_id.user_id.name}</strong>
          <span>{teacher.class_id.subject}</span>
        </div>
      </header>
      <p>{teacher.class_id.user_id.bio}</p>

      <footer>
        <p>
          Preço/hora:
          <strong>R$ {teacher.class_id.cost}</strong>
        </p>
        <a target="blank" onClick={createNewConnection} href={`https://wa.me/${teacher.class_id.user_id.whatsapp}`}>

          <img src={whatsAppIcon} alt="whatsapp" />
          Entrar em contato

        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
