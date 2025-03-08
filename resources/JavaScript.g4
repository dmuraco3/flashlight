lexer grammar JavaScript;

fragment TAB: '\u0009';
fragment VT: '\u000B';
fragment FF: '\u000c';
fragment ZWNBSP: '\uFEFF';
fragment USP: [\uE000-\uF8FF];
WhiteSpace: TAB | VT | FF | ZWNBSP | USP;

fragment LF: '\u000A';
fragment CR: '\u000D';
fragment LS: '\u2028';
fragment PS: '\u2029';

LineTerminator: LF | CR | LS | PS;
LineTerminatorSequence: LF | CR | LS | PS | (CR LF);

MultiLineComment: '/*' MultiLineCommentChars? '*/';
MultiLineCommentChars:
	MultiLineNotAsteriskChar MultiLineCommentChars? '*' PostAsteriskCommentChars?;
PostAsteriskCommentChars:
	MultiLineNotForwardSlashOrAsteriskChar MultiLineCommentChars? '*' PostAsteriskCommentChars?;
MultiLineNotAsteriskChar: ~('*');
MultiLineNotForwardSlashOrAsteriskChar: ~('/' | /'*');

SingleLineComment: '//' SingleLineCommentChars?;
SingleLineCommentChars:
	SingleLineCommentChar SingleLineCommentChars?;
SingleLineCommentChar:
	~('\u000A' | '\u000D' | '\u2028' | '\u2029');

HashbangComment: '#!' SingleLineCommentChars?;

CommonToken:
	IdentifierName
	| PrivateIdentifier
	| Punctuator
	| NumericLiteral
	| StringLiteral
	| Template;

PrivateIdentifier: '#' IdentifierName;
IdentifierName: IdentifierStart IdentifierName IdentifierPart;
IdentifierStart: IdentifierStartChar '\\' UnicodeEscapeSequence;
IdentifierPart: IdentifierPartChar '\\' UnicodeEscapeSequence;
IdentifierStartChar: UnicodeIDStart '$-';
IdentifierPartChar: UnicodeIDContinue '$';