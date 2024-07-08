import React, { Component } from "react";
import "./style.css";
import { swapiPeople } from "@shared/types/api";

export type CardProps = Partial<swapiPeople>;

export class Card extends Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        {Object.entries(this.props).map(([key, value]) => {
          return (
            <div className="card_line" key={key}>{`${key}: ${value}`}</div>
          );
        })}
      </div>
    );
  }
}
