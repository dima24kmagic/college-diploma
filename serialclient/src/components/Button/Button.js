import React, { Component } from "react";
import "./Button.scss";

export default class Button extends Component {
  getLargestButtonDimension = target => {
    return Math.max(target.clientWidth, target.clientHeight);
  };
  createRipple = e => {
    const { currentTarget: target, clientX, clientY } = e;
    const d = this.getLargestButtonDimension(target);

    const ripple = document.createElement("span");
    ripple.classList.add("button__ripple");

    ripple.style.width = d + "px";
    ripple.style.height = d + "px";
    ripple.style.left = clientX - target.offsetLeft - d / 2 + "px";
    ripple.style.top = clientY - target.offsetTop - d / 2 + "px";

    setTimeout(() => {
      ripple.remove();
    }, 650);
    return ripple;
  };
  appendRipple = e => {
    const { currentTarget: target } = e;
    const ripple = this.createRipple(e);
    target.appendChild(ripple);
  };
  handleOnClick = e => {
    this.appendRipple(e);
    const { onClick } = this.props;
    onClick();
  };
  render() {
    const { children } = this.props;
    return (
      <div className="button" onClick={this.handleOnClick}>
        {children}
      </div>
    );
  }
}

Button.defaultProps = {
  onClick: () => {}
};
