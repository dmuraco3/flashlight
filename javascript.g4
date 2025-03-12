lexer grammar javascript;

NoSubstitutionTemplate: '`' TemplateCharacters? '`';

TemplateHead: '`' TemplateCharacters? '${';

TemplateSubstitutionTail: TemplateMiddle | TemplateTail;

TemplateMiddle: '}' TemplateCharacters? '${';

TemplateTail: '}' TemplateCharacters? '`';

TemplateCharacters: TemplateCharacter TemplateCharacters?;

TemplateCharacter: '$' ~('{');

TemplateSubstitution: '${' Template* '}';

Template:
	('`' TemplateCharacters? '`')
	| ('`' ( TemplateCharacters | TemplateSubstitution)* '`');