import React, { useState, FormEvent } from "react";
import {useHistory} from 'react-router-dom';
import PageHeader from "../../components/PageHeader";
import "./styles.css";
import Input from "../../components/Input";
import warningIcon from "../../assets/images/icons/warning.svg";
import Textarea from "../../components/TextArea";
import Select from "../../components/Select";
import api from "../../api/api";

export default function TeacherForm() {
  const history = useHistory();
  const [name, setname] = useState("");
  const [avatar, setavatar] = useState("");
  const [whatsapp, setwhatsapp] = useState("");
  const [bio, setbio] = useState("");

  const [subject, setsubject] = useState("");
  const [cost, setcost] = useState("");

  const [scheduleItem, setScheduleItem] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  function addScheduleItem() {
    setScheduleItem([...scheduleItem, { week_day: 0, from: "", to: "" }]);
  }

  function setScheduleItemValue(index: number, field: string, value: string) {
    const newArray = scheduleItem.map((e, pos) => {
      if (index === pos) {
        return { ...e, [field]: value };
      } else return e;
    });
    setScheduleItem(newArray);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api
      .post("/classes/create", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItem,
      })
      .then(() => {
        alert('Cadastro realizado com sucesso!');
        history.push('/');
      }).catch(()=>{
        alert('Erro no cadastro');
      })
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição."
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              label="Nome Completo"
              name="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <Input
              label="Avatar"
              name="avatar"
              value={avatar}
              onChange={(e) => setavatar(e.target.value)}
            />
            <Input
              label="WhatsApp"
              name="whatsapp"
              value={whatsapp}
              onChange={(e) => setwhatsapp(e.target.value)}
            />
            <Textarea
              label="Biografia"
              name="bio"
              value={bio}
              onChange={(e) => setbio(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>

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
            <Input
              label="Custo da hora por aula"
              name="cost"
              value={cost}
              onChange={(e) => setcost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis{" "}
              <button type="button" onClick={addScheduleItem}>
                {" "}
                + Novo horário
              </button>
            </legend>
            {scheduleItem.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    label="Dia da semana"
                    name="week_day"
                    value={scheduleItem.week_day}
                    onChange={(e) =>
                      setScheduleItemValue(index, "week_day", e.target.value)
                    }
                    options={[
                      { value: "0", label: "Seunda-feira" },
                      { value: "1", label: "Terça-feira" },
                      { value: "2", label: "Quarta-feira" },
                      { value: "3", label: "Quinta-feira" },
                      { value: "4", label: "Sexta-feira" },
                    ]}
                  />
                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    value={scheduleItem.from}
                    onChange={(e) =>
                      setScheduleItemValue(index, "from", e.target.value)
                    }
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={scheduleItem.to}
                    onChange={(e) =>
                      setScheduleItemValue(index, "to", e.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="aviso" />
              Importante <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}
