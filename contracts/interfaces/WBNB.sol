//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

abstract contract WBNB {
    function deposit() public virtual payable;
    function approve(address spender, uint amount) external virtual;
    function allowance(address owner, address spender) external view virtual returns(uint);
    function balanceOf(address owner) external view virtual returns(uint);
    function withdraw(uint wad) public virtual;
}