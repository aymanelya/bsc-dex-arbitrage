const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Arbitrage contract', ()=> {
    let Arbitrage, arbitrage, owner;

    beforeEach(async () => {
        Arbitrage = await  ethers.getContractFactory('Arbitrage');
        arbitrage = await Arbitrage.deploy();
        [owner,_] = await ethers.getSigners();
    });

    describe('Deployment',  ()=> {
        it('Should set the right owner', async ()=> {
            expect(await arbitrage.owner()).to.equal(owner.address)
        });
    });

    describe('Execution', ()=> {
        it('Should fail if arbitrage is not profitable', async ()=> {
            const amountIn = ethers.utils.parseEther('1');

            // The loan factory should be any DEX factory that is not used in the arbitrage (should have the flashswap functionnality)
            const loanFactory = "0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6" //APESWAP FACTORY
            const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
            const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
            const loanPair = [WBNB,BUSD] //Taking loan of WBNB from the WBNB-BUSD pair

            const path = [WBNB,BUSD,WBNB]
            const WBNB_BUSD_PANCAKEV2 = "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16"
            const BUSD_WBNB_BISWAP = "0xaCAac9311b0096E04Dfe96b6D87dec867d3883Dc"

            const pairPath = [WBNB_BUSD_PANCAKEV2,BUSD_WBNB_BISWAP]
            const feesPath = [25,10] //Swap fees for every exchange (depending on corresponding pairPath DEX)

            await expect(arbitrage.flashWbnbSwap(amountIn,loanFactory,loanPair,path,pairPath,feesPath)).to.be.revertedWith('No profit')


            
        })
    })
});