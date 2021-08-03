import { isHoverEnabled } from "./HoverState";
import { element, func, oneOfType } from "prop-types"
import React, { Component } from "react"

export interface IHoverableState {
  isHovered: boolean
  showHover: boolean
}

export interface IHoverableProps {
  children: any

  onHoverIn?()
  onHoverOut?()
  onMouseMove?()
}

export default class Hoverable extends Component<IHoverableProps, IHoverableState> {
  constructor(props) {
    super(props);
    this.state = { isHovered: false, showHover: true };
    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._handleGrant = this._handleGrant.bind(this);
    this._handleRelease = this._handleRelease.bind(this);
    this._handleMouseMove = this._handleMouseMove.bind(this);
  }

  _handleMouseEnter(e) {
    if (isHoverEnabled() && !this.state.isHovered) {
      const { onHoverIn } = this.props;
      if (onHoverIn) onHoverIn();
      this.setState(state => ({ ...state, isHovered: true }));
    }
  }

  _handleMouseMove(e) {
    if (isHoverEnabled()) {
      const { onMouseMove } = this.props;
      if (onMouseMove) onMouseMove();
    }
  }

  _handleMouseLeave(e) {
    if (this.state.isHovered) {
      const { onHoverOut } = this.props;
      if (onHoverOut) onHoverOut();
      this.setState(state => ({ ...state, isHovered: false }));
    }
  }

  _handleGrant() {
    this.setState(state => ({ ...state, showHover: false }));
  }

  _handleRelease() {
    this.setState(state => ({ ...state, showHover: true }));
  }

  render() {
    const { children, onHoverIn, onHoverOut } = this.props;
    const child =
      typeof children === "function"
        ? children(this.state.showHover && this.state.isHovered)
        : children;

    return React.cloneElement(React.Children.only(child), {
      onMouseEnter: this._handleMouseEnter,
      onMouseLeave: this._handleMouseLeave,
      onMouseMove: this._handleMouseMove,
      // prevent hover showing while responder
      onResponderGrant: this._handleGrant,
      onResponderRelease: this._handleRelease,
      // if child is Touchable
      onPressIn: this._handleGrant,
      onPressOut: this._handleRelease
    });
  }
}