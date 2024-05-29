import { PencilLine } from "@phosphor-icons/react";

import { Avatar } from "./Avatar";

import s from "./Sidebar.module.css";

export function Sidebar() {
  return (
    <aside className={s.sidebar}>
      <img
        className={s.cover}
        alt="sidebar cover image"
        src="https://images.unsplash.com/photo-1611252871536-305c663777ab?q=50&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className={s.profile}>
        <Avatar
          cssClass={s.avatar}
          alt="sidebar avatar"
          src="https://github.com/rafaelbertelli.png"
        />

        <strong>Rafael Borges</strong>
        <span>Frontend Software Engineer</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}
