// Generated from /Users/dmuraco/javascript_projects/flashlight/javascript.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue", "this-escape"})
public class javascript extends Lexer {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		NoSubstitutionTemplate=1, TemplateHead=2, TemplateSubstitutionTail=3, 
		TemplateMiddle=4, TemplateTail=5, TemplateCharacters=6, TemplateCharacter=7, 
		TemplateSubstitution=8, Template=9;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"NoSubstitutionTemplate", "TemplateHead", "TemplateSubstitutionTail", 
			"TemplateMiddle", "TemplateTail", "TemplateCharacters", "TemplateCharacter", 
			"TemplateSubstitution", "Template"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "NoSubstitutionTemplate", "TemplateHead", "TemplateSubstitutionTail", 
			"TemplateMiddle", "TemplateTail", "TemplateCharacters", "TemplateCharacter", 
			"TemplateSubstitution", "Template"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}


	public javascript(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "javascript.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\u0004\u0000\tS\u0006\uffff\uffff\u0002\u0000\u0007\u0000\u0002\u0001"+
		"\u0007\u0001\u0002\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004"+
		"\u0007\u0004\u0002\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007"+
		"\u0007\u0007\u0002\b\u0007\b\u0001\u0000\u0001\u0000\u0003\u0000\u0016"+
		"\b\u0000\u0001\u0000\u0001\u0000\u0001\u0001\u0001\u0001\u0003\u0001\u001c"+
		"\b\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0002\u0001\u0002\u0003"+
		"\u0002#\b\u0002\u0001\u0003\u0001\u0003\u0003\u0003\'\b\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0004\u0001\u0004\u0003\u0004.\b\u0004"+
		"\u0001\u0004\u0001\u0004\u0001\u0005\u0001\u0005\u0003\u00054\b\u0005"+
		"\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0007\u0001\u0007\u0001\u0007"+
		"\u0001\u0007\u0005\u0007=\b\u0007\n\u0007\f\u0007@\t\u0007\u0001\u0007"+
		"\u0001\u0007\u0001\b\u0001\b\u0003\bF\b\b\u0001\b\u0001\b\u0001\b\u0001"+
		"\b\u0005\bL\b\b\n\b\f\bO\t\b\u0001\b\u0003\bR\b\b\u0000\u0000\t\u0001"+
		"\u0001\u0003\u0002\u0005\u0003\u0007\u0004\t\u0005\u000b\u0006\r\u0007"+
		"\u000f\b\u0011\t\u0001\u0000\u0001\u0001\u0000{{]\u0000\u0001\u0001\u0000"+
		"\u0000\u0000\u0000\u0003\u0001\u0000\u0000\u0000\u0000\u0005\u0001\u0000"+
		"\u0000\u0000\u0000\u0007\u0001\u0000\u0000\u0000\u0000\t\u0001\u0000\u0000"+
		"\u0000\u0000\u000b\u0001\u0000\u0000\u0000\u0000\r\u0001\u0000\u0000\u0000"+
		"\u0000\u000f\u0001\u0000\u0000\u0000\u0000\u0011\u0001\u0000\u0000\u0000"+
		"\u0001\u0013\u0001\u0000\u0000\u0000\u0003\u0019\u0001\u0000\u0000\u0000"+
		"\u0005\"\u0001\u0000\u0000\u0000\u0007$\u0001\u0000\u0000\u0000\t+\u0001"+
		"\u0000\u0000\u0000\u000b1\u0001\u0000\u0000\u0000\r5\u0001\u0000\u0000"+
		"\u0000\u000f8\u0001\u0000\u0000\u0000\u0011Q\u0001\u0000\u0000\u0000\u0013"+
		"\u0015\u0005`\u0000\u0000\u0014\u0016\u0003\u000b\u0005\u0000\u0015\u0014"+
		"\u0001\u0000\u0000\u0000\u0015\u0016\u0001\u0000\u0000\u0000\u0016\u0017"+
		"\u0001\u0000\u0000\u0000\u0017\u0018\u0005`\u0000\u0000\u0018\u0002\u0001"+
		"\u0000\u0000\u0000\u0019\u001b\u0005`\u0000\u0000\u001a\u001c\u0003\u000b"+
		"\u0005\u0000\u001b\u001a\u0001\u0000\u0000\u0000\u001b\u001c\u0001\u0000"+
		"\u0000\u0000\u001c\u001d\u0001\u0000\u0000\u0000\u001d\u001e\u0005$\u0000"+
		"\u0000\u001e\u001f\u0005{\u0000\u0000\u001f\u0004\u0001\u0000\u0000\u0000"+
		" #\u0003\u0007\u0003\u0000!#\u0003\t\u0004\u0000\" \u0001\u0000\u0000"+
		"\u0000\"!\u0001\u0000\u0000\u0000#\u0006\u0001\u0000\u0000\u0000$&\u0005"+
		"}\u0000\u0000%\'\u0003\u000b\u0005\u0000&%\u0001\u0000\u0000\u0000&\'"+
		"\u0001\u0000\u0000\u0000\'(\u0001\u0000\u0000\u0000()\u0005$\u0000\u0000"+
		")*\u0005{\u0000\u0000*\b\u0001\u0000\u0000\u0000+-\u0005}\u0000\u0000"+
		",.\u0003\u000b\u0005\u0000-,\u0001\u0000\u0000\u0000-.\u0001\u0000\u0000"+
		"\u0000./\u0001\u0000\u0000\u0000/0\u0005`\u0000\u00000\n\u0001\u0000\u0000"+
		"\u000013\u0003\r\u0006\u000024\u0003\u000b\u0005\u000032\u0001\u0000\u0000"+
		"\u000034\u0001\u0000\u0000\u00004\f\u0001\u0000\u0000\u000056\u0005$\u0000"+
		"\u000067\b\u0000\u0000\u00007\u000e\u0001\u0000\u0000\u000089\u0005$\u0000"+
		"\u00009:\u0005{\u0000\u0000:>\u0001\u0000\u0000\u0000;=\u0003\u0011\b"+
		"\u0000<;\u0001\u0000\u0000\u0000=@\u0001\u0000\u0000\u0000><\u0001\u0000"+
		"\u0000\u0000>?\u0001\u0000\u0000\u0000?A\u0001\u0000\u0000\u0000@>\u0001"+
		"\u0000\u0000\u0000AB\u0005}\u0000\u0000B\u0010\u0001\u0000\u0000\u0000"+
		"CE\u0005`\u0000\u0000DF\u0003\u000b\u0005\u0000ED\u0001\u0000\u0000\u0000"+
		"EF\u0001\u0000\u0000\u0000FG\u0001\u0000\u0000\u0000GR\u0005`\u0000\u0000"+
		"HM\u0005`\u0000\u0000IL\u0003\u000b\u0005\u0000JL\u0003\u000f\u0007\u0000"+
		"KI\u0001\u0000\u0000\u0000KJ\u0001\u0000\u0000\u0000LO\u0001\u0000\u0000"+
		"\u0000MK\u0001\u0000\u0000\u0000MN\u0001\u0000\u0000\u0000NP\u0001\u0000"+
		"\u0000\u0000OM\u0001\u0000\u0000\u0000PR\u0005`\u0000\u0000QC\u0001\u0000"+
		"\u0000\u0000QH\u0001\u0000\u0000\u0000R\u0012\u0001\u0000\u0000\u0000"+
		"\f\u0000\u0015\u001b\"&-3>EKMQ\u0000";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}