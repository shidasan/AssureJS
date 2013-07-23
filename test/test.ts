///// <reference path="CaseDecoder.ts" />
//
//function test() : void {
//	var JsonData : any = {
//			"DCaseName" : "test",
//			"NodeCount" : 8,
//			"TopGoalLabel" : "1",
//			"NodeList": [
//				{
//					"Children": [
//						"2"
//					],
//					"Statement": "G",
//					"NodeType": "Goal",
//					"Label": "1",
//					"Annotations" : [],
//					"Notes" : []
//				},
//				{
//					"Children": [
//						"3",
//						"4"
//					],
//					"Statement": "Alternative",
//					"NodeType": "Strategy",
//					"Label": "2",
//					"Annotations" : [],
//					"Notes" : []
//				},
//				{
//					"Children": [
//						"5"
//					],
//					"Statement": "G",
//					"NodeType": "Goal",
//					"Label": "3",
//					"Annotations" : [],
//					"Notes" : []
//				},
//				{
//					"Children": [
//						"6",
//						"7"
//					],
//					"Statement": "s",
//					"NodeType": "Strategy",
//					"Label": "5",
//					"Annotations" : [],
//					"Notes" : []
//				},
//				{
//					"Children": [],
//					"Statement": "t1",
//					"NodeType": "Goal",
//					"Label": "6",
//					"Annotations" : [],
//					"Notes" : []
//				},
//				{
//					"Children": [
//						"8"
//					],
//					"Statement": "D-script",
//					"NodeType": "Goal",
//					"Label": "7",
//					"Annotations" : [],
//					"Notes" : []
//				},
//				{
//					"Children": [],
//					"Statement": "x",
//					"NodeType": "Solution",
//					"Label": "8",
//					"Annotations" : [],
//					"Notes" : []
//				},
//				{
//					"Children": [],
//					"Statement": "t2",
//					"NodeType": "Goal",
//					"Label": "4",
//					"Annotations" : [],
//					"Notes" : []
//				},
//				{
//					"Children": [],
//					"Statement": "C",
//					"NodeType": "Context",
//					"Label": "9",
//					"Annotations" : [],
//					"Notes" : []
//				}
//			]
//	}
//
//	var caseDecoder : CaseDecoder = new CaseDecoder();
//	var root : CaseModel = caseDecoder.ParseJson(null, JsonData);
//}
//
//test();
