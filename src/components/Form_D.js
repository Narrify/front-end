import * as React from "react";
import "../styles/D_header.css";
import { MdAddCircleOutline } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import 'animate.css';

export default function Component () {
  return (
    <div className="character-atributes">
      <div className="mb-3 box-character animate__animated animate__fadeInLeft">
        <GoPerson size={40} />
      </div>
      <div className="mb-3 box-character animate__animated animate__fadeInUp">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Name
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Pablo Escobar"
        />
      </div>
      <div className="mb-3 box-character animate__animated animate__fadeInUp">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Personality
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="friendly, funny"
        />
      </div>
      <div className="mb-3 box-character back-btn animate__animated animate__fadeInRight">
        <MdAddCircleOutline size={40} />
      </div>
    </div>
  );
}
