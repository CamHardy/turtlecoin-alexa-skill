# TurtleCoin Official Alexa Skill

The official TurtleCoin info skill for Alexa. Learn more about the coin and the community, get useful stats and data, and find out how you can become involved!

## Prerequisites

- Alexa Skills Kit CLI  
	``` npm i -g ask-cli ```
- That's it!

## Getting Started

Initialize the Alexa Skills Kit with your Amazon developer account:  
``` 
ask init 
```

Install lambda node modules:  
``` 
cd lambda/custom 
npm i 
```

From the root directory (i.e. the one with skill.json in it), run:  

``` ask deploy ``` to deploy everything (skill, model, lambda, ISPs)  
``` ask dialog ``` to interact with the skill via text simulation  

## TODO:
### Skill Manifest
- [ ] Add example phrases to utterances list
- [ ] Add small/large icon uri (link to brand resources repo?)

### Skill
- [ ] Add utterances
	- [ ] Coin difficulty
	- [ ] Block height
	- [ ] Block reward
	- [ ] Hashrate
	- [ ] Total/circulating supply
	- [ ] Public nodes
	- [ ] Node fees
	- [ ] Market price (high/low/etc)
	- [ ] Market volume
	- [ ] General coin info/facts
	- [ ] Discord/Github/Wiki/Blog links
	- [ ] Skill info
- [ ]  Add slots
	- [ ] Nodes with a fee below x
- [x] Test using "TurtleCoin" as the invocation name

### Lambda Function
- [ ] APIs
	- [x]  [Market info](https://tradeogre.com/api/v1/ticker/BTC-TRTL)
	- [x]  [Bitcoin Info](https://www.bitstamp.net/api/ticker)
	- [x]  [Coin info](http://public.turtlenode.io:11898/info)
	- [x]  [Node info](https://trtl.nodes.pub/api/getNodes)
- [ ] Scrape content from https://turtlecoin.lol