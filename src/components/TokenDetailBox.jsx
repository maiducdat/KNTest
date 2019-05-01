import './TokenDetailBox.css';
import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import CONSTANTS from "../constants";

class TokenDetailBox extends React.Component {
  render() {
    return (
      <div className="token-detail-box-container d-flex flex-column justify-content-start g-margin">
        <h5>
          {this.props.label}
        </h5>
        <div className="token-detail-box-content d-flex flex-row">
          <UncontrolledDropdown>
            <DropdownToggle
              className="pointer"
              tag="span"
              data-toggle="dropdown"
            >
              <div className="token-option d-flex flex-row justify-content-center">
                <img
                  className="token-image"
                  alt={this.props.detail.token.symbol}
                  src={"https://files.kyber.network/DesignAssets/tokens/" + this.props.detail.token.symbol.toLowerCase() + ".svg"}
                />
                <span className="ml-2">
                  {this.props.detail.token.symbol}
                  <i className="fas fa-chevron-down ml-2"></i>
                </span>
              </div>
            </DropdownToggle>
            <DropdownMenu>
              {
                CONSTANTS.TOKEN_LIST.map((token, index) => {
                  return <DropdownItem
                    key={index}
                    value={token.symbol}
                    onClick={e => this.props.onChangeToken(this.props.type, 'token', token)}
                  >
                    <div className="token-option d-flex flex-row justify-content-start">
                      <img
                        className="token-image"
                        alt={token.symbol}
                        src={"https://files.kyber.network/DesignAssets/tokens/" + token.symbol.toLowerCase() + ".svg"}
                      />
                      <span className="ml-2">{token.symbol}</span>
                    </div>
                  </DropdownItem>
                })
              }
            </DropdownMenu>
          </UncontrolledDropdown>
          <input
            className="value-input text-right flex-fill"
            placeholder="0"
            type="number"
            value={this.props.detail.value}
            onChange={e => this.props.onChangeToken(this.props.type, 'value',e.target.value)}
          />
        </div>
      </div>
    );
  }
}

export default TokenDetailBox;