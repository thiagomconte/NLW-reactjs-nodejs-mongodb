import React, { useState, FormEvent } from "react";
import "./style.css";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../api/api";

export default function TeacherList() {
  const [teachers, setteachers] = useState([]);
  const [subject, setsubject] = useState("");
  const [week_day, setweek_day] = useState("");
  const [time, settime] = useState("");
  async function searchTeachers(e: FormEvent) {
    e.preventDefault();
    setteachers([]);
    const res = await api.get("/classes", {
      params: { subject, week_day, time },
    });
    setteachers(res.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            label="Matéria"
            name="subject"
            value={subject}
            onChange={(e) => setsubject(e.target.value)}
            options={[
              { value: "Ciências", label: "Ciências" },
              { value: "Programação", label: "Programação" },
              { value: "Matemática", label: "Matemática" },
              { value: "Educação Física", label: "Educação Física" },
              { value: "Geografia", label: "Geografia" },
            ]}
          />
          <Select
            label="Dia da semana"
            name="week_day"
            value={week_day}
            onChange={(e) => setweek_day(e.target.value)}
            options={[
              { value: "0", label: "Seunda-feira" },
              { value: "1", label: "Terça-feira" },
              { value: "2", label: "Quarta-feira" },
              { value: "3", label: "Quinta-feira" },
              { value: "4", label: "Sexta-feira" },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => settime(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>
      <main>
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem key={teacher.class_id.user_id._id} teacher={teacher} />
          );
        })}
      </main>
    </div>
  );
}
