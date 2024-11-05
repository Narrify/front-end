import * as React from "react";
import "../styles/D_header.css";
import { MdAddCircleOutline } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import 'animate.css';

export default function Component () {
  return (
    <div className="character-atributes">
      <div className="mb-3 box-character ">
        <GoPerson size={40} />
      </div>
      <div className="mb-3 box-character ">
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
      <div className="mb-3 box-character">
        <label className="form-label">
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
      <div className="mb-3 box-character back-btn ">
        <MdAddCircleOutline size={40} />
      </div>
    </div>
  );
}
