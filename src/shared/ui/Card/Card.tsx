import React, { Component } from "react";
import "./style.css";

export type CardProps = { name: string; description: string };

export class Card extends Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <div className="card_line">
          Name: <span>{this.props.name}</span>
        </div>
        <div className="card_line">
          Description: <span>{this.props.description}</span>
        </div>
      </div>
    );
  }
}
