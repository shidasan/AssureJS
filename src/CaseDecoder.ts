///<reference path='./CaseModel.ts'/>

function OutputError(o : any) : void {
		console.log("error: " + o);
}

class Parser {

	Argument : Argument;

	constructor(Argument : Argument) {
		this.Argument = Argument;
	}

	parse(source : any) : CaseModel {
		return null;
	}

}

class MarkcaseParser extends Parser {

	parse(source : any) : CaseModel {
		var MarkCase : string = <string>source;
		return null;
	}

}

class CaseDecoder {

	constructor() {
	}

	ParseJson(Argument : Argument, jsonData : any) : CaseModel  {
		// TODO
		return null;
	}

	ParseDCaseXML(Argument : Argument, XML : any) : CaseModel {
		// TODO
		return null;
	}

	ParseMarkCase(Argument : Argument,  MarkCase: string) : CaseModel {
		// TODO
		return null;
	}

}

