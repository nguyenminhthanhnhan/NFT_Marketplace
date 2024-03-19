// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IERC721 {
    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external;
}

contract BiddingContract {
    uint256 private constant DURATION = 7 days;

    IERC721 public immutable nft;
    uint256 public immutable nftId;

    address payable public immutable seller;

    uint256 public immutable startingPrice;
    uint256 public immutable discountRate;

    uint256 public immutable startAt;
    uint256 public immutable expiresAt;

    constructor(
        uint256 _startingPrice,
        uint256 _discountRate,
        address _nft,
        uint256 _nftId
    ) {
        seller = payable(msg.sender);

        startingPrice = _startingPrice;
        discountRate = _discountRate;
        startAt = block.timestamp;
        expiresAt = startAt + DURATION;

        require(_startingPrice > 0, "Starting price must be greater than 0");
        require(
            _startingPrice >= _discountRate + DURATION,
            "Starting price must be greater than discount rate"
        );
        nft = IERC721(_nft);
        nftId = _nftId;
    }

    // GET PRICE

    function getPrice() public view returns (uint256) {
        uint256 timeElapsed = block.timestamp - startAt;
        uint256 discountedPrice = discountRate * timeElapsed;
        return startingPrice - discountedPrice;
    }

    // BUY

    function buy() public payable {
        require(block.timestamp < expiresAt, "Auction has expired");

        uint256 price = getPrice();
        require(msg.value >= price, "Insufficient funds");

        nft.transferFrom(seller, msg.sender, nftId);

        uint256 refund = msg.value - price;

        if (refund > 0) {
            payable(msg.sender).transfer(refund);
        }

        selfdestruct(seller);
    }
}
