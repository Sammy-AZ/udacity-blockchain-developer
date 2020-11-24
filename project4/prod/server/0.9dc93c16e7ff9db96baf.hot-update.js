exports.id=0,exports.modules={"./src/server/server.js":function(e,o,s){"use strict";s.r(o);var t,n,r=s("./build/contracts/FlightSuretyApp.json"),c=s("./src/server/config.json"),l=s("web3"),a=s.n(l),i=s("express"),u=s.n(i),g=c.localhost,d=new a.a(new a.a.providers.WebsocketProvider(g.url.replace("http","ws"))),f=new d.eth.Contract(r.abi,g.appAddress),h=[];d.eth.getAccounts().then((function(e){e.length<20?console.log("\nServer Error - Not enough accounts to support oracles...\nYou need at least 20 to power up the oracles server."):(t=e.length-20-1,n=20+t,console.log("Ganache returned "+e.length+" accounts."),console.log("Server will use only 20 of these accounts for oracles."),console.log("Starting from accounts["+t+"] for the first oracle."),console.log("Ending at accounts["+n+"] for the last oracle."),f.methods.REGISTRATION_FEE().call({from:e[0],gas:4712388,gasPrice:1e11}).then((function(o){console.log("Smart Contract requires ("+o+") wei to fund oracle registration.");for(var s=function(){var s=e[r];h.push(s),console.log("About to register oracle: "+s),f.methods.registerOracle().send({from:s,value:o,gas:4712388,gasPrice:1e11}).then((function(e){console.log("Registered: "+s)})).catch((function(e){console.log("Could not create oracle at address: "+s+"\n\tbecause: "+e)}))},r=t;r<n;r++)s();h.forEach((function(e){f.methods.getMyIndexes().call({from:e,gas:4712388,gasPrice:1e11}).then((function(o){console.log("Assigned Indices: "+o[0]+", "+o[1]+", "+o[2]+"\tfor oracle: "+e)})).catch((function(e){console.log("Could not retrieve oracle indices because: "+e)}))})),console.log("Oracles server all set-up...\nOracles registered and assigned addresses..."),console.log("Listening to a request event..."),f.events.OracleRequest({fromBlock:"latest"},(function(e,o){e&&console.log(e),console.log("Caught an event: ");var s=o.returnValues;console.log(s);var t=s.index,n=s.airline,r=s.flight,c=s.timestamp;console.log("Only the oracles with index "+t+" should respond to the request."),h.forEach((function(e){f.methods.getMyIndexes().call({from:e,gas:4712388,gasPrice:1e11}).then((function(o){if(o[0]==t||o[1]==t||o[2]==t){var s=10*(1+Math.floor(5*Math.random()));console.log("HIT- Responding with random flight status: "+s+" from oracle: "+e),f.methods.submitOracleResponse(t,n,r,c,s).send({from:e,gas:4712388,gasPrice:1e11}).then((function(o){console.log("Oracle ["+e+"] response submitted successfully.")})).catch((function(e){console.log("Could not submit oracle response because: "+e)}))}})).catch((function(e){console.log("Could not retrieve oracle indices because: "+e)}))}))}))})).catch((function(e){console.log("Could not retrieve registration fee. "+e)})))}));var p=u()();p.get("/api",(function(e,o){o.send({message:"An API for use with your Dapp!"})})),o.default=p}};