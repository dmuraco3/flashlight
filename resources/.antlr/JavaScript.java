// Generated from /Users/dmuraco/javascript_projects/flashlight/resources/JavaScript.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue", "this-escape"})
public class JavaScript extends Lexer {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		WhiteSpace=1, LineTerminator=2, LineTerminatorSequence=3, MultiLineComment=4, 
		MultiLineCommentChars=5, PostAsteriskCommentChars=6, MultiLineNotAsteriskChar=7, 
		MultiLineNotForwardSlashOrAsteriskChar=8, SingleLineComment=9, SingleLineCommentChars=10, 
		SingleLineCommentChar=11;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"TAB", "VT", "FF", "ZWNBSP", "USP", "WhiteSpace", "LF", "CR", "LS", "PS", 
			"LineTerminator", "LineTerminatorSequence", "MultiLineComment", "MultiLineCommentChars", 
			"PostAsteriskCommentChars", "MultiLineNotAsteriskChar", "MultiLineNotForwardSlashOrAsteriskChar", 
			"SingleLineComment", "SingleLineCommentChars", "SingleLineCommentChar"
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
			null, "WhiteSpace", "LineTerminator", "LineTerminatorSequence", "MultiLineComment", 
			"MultiLineCommentChars", "PostAsteriskCommentChars", "MultiLineNotAsteriskChar", 
			"MultiLineNotForwardSlashOrAsteriskChar", "SingleLineComment", "SingleLineCommentChars", 
			"SingleLineCommentChar"
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


	public JavaScript(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "JavaScript.g4"; }

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
		"\u0004\u0000\u000bz\u0006\uffff\uffff\u0002\u0000\u0007\u0000\u0002\u0001"+
		"\u0007\u0001\u0002\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004"+
		"\u0007\u0004\u0002\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007"+
		"\u0007\u0007\u0002\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b"+
		"\u0007\u000b\u0002\f\u0007\f\u0002\r\u0007\r\u0002\u000e\u0007\u000e\u0002"+
		"\u000f\u0007\u000f\u0002\u0010\u0007\u0010\u0002\u0011\u0007\u0011\u0002"+
		"\u0012\u0007\u0012\u0002\u0013\u0007\u0013\u0001\u0000\u0001\u0000\u0001"+
		"\u0001\u0001\u0001\u0001\u0002\u0001\u0002\u0001\u0003\u0001\u0003\u0001"+
		"\u0004\u0001\u0004\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001"+
		"\u0005\u0003\u00059\b\u0005\u0001\u0006\u0001\u0006\u0001\u0007\u0001"+
		"\u0007\u0001\b\u0001\b\u0001\t\u0001\t\u0001\n\u0001\n\u0001\n\u0001\n"+
		"\u0003\nG\b\n\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b"+
		"\u0001\u000b\u0001\u000b\u0003\u000bP\b\u000b\u0001\f\u0001\f\u0001\f"+
		"\u0001\f\u0003\fV\b\f\u0001\f\u0001\f\u0001\f\u0001\r\u0001\r\u0003\r"+
		"]\b\r\u0001\r\u0001\r\u0003\ra\b\r\u0001\u000e\u0001\u000e\u0003\u000e"+
		"e\b\u000e\u0001\u000e\u0001\u000e\u0003\u000ei\b\u000e\u0001\u000f\u0001"+
		"\u000f\u0001\u0010\u0001\u0010\u0001\u0011\u0001\u0011\u0001\u0011\u0001"+
		"\u0011\u0003\u0011s\b\u0011\u0001\u0012\u0001\u0012\u0003\u0012w\b\u0012"+
		"\u0001\u0013\u0001\u0013\u0000\u0000\u0014\u0001\u0000\u0003\u0000\u0005"+
		"\u0000\u0007\u0000\t\u0000\u000b\u0001\r\u0000\u000f\u0000\u0011\u0000"+
		"\u0013\u0000\u0015\u0002\u0017\u0003\u0019\u0004\u001b\u0005\u001d\u0006"+
		"\u001f\u0007!\b#\t%\n\'\u000b\u0001\u0000\u0004\u0001\u0000\u8000\ue000"+
		"\u8000\uf8ff\u0001\u0000**\u0002\u0000**//\u0003\u0000\n\n\r\r\u2028\u2029"+
		"\u0082\u0000\u000b\u0001\u0000\u0000\u0000\u0000\u0015\u0001\u0000\u0000"+
		"\u0000\u0000\u0017\u0001\u0000\u0000\u0000\u0000\u0019\u0001\u0000\u0000"+
		"\u0000\u0000\u001b\u0001\u0000\u0000\u0000\u0000\u001d\u0001\u0000\u0000"+
		"\u0000\u0000\u001f\u0001\u0000\u0000\u0000\u0000!\u0001\u0000\u0000\u0000"+
		"\u0000#\u0001\u0000\u0000\u0000\u0000%\u0001\u0000\u0000\u0000\u0000\'"+
		"\u0001\u0000\u0000\u0000\u0001)\u0001\u0000\u0000\u0000\u0003+\u0001\u0000"+
		"\u0000\u0000\u0005-\u0001\u0000\u0000\u0000\u0007/\u0001\u0000\u0000\u0000"+
		"\t1\u0001\u0000\u0000\u0000\u000b8\u0001\u0000\u0000\u0000\r:\u0001\u0000"+
		"\u0000\u0000\u000f<\u0001\u0000\u0000\u0000\u0011>\u0001\u0000\u0000\u0000"+
		"\u0013@\u0001\u0000\u0000\u0000\u0015F\u0001\u0000\u0000\u0000\u0017O"+
		"\u0001\u0000\u0000\u0000\u0019Q\u0001\u0000\u0000\u0000\u001bZ\u0001\u0000"+
		"\u0000\u0000\u001db\u0001\u0000\u0000\u0000\u001fj\u0001\u0000\u0000\u0000"+
		"!l\u0001\u0000\u0000\u0000#n\u0001\u0000\u0000\u0000%t\u0001\u0000\u0000"+
		"\u0000\'x\u0001\u0000\u0000\u0000)*\u0005\t\u0000\u0000*\u0002\u0001\u0000"+
		"\u0000\u0000+,\u0005\u000b\u0000\u0000,\u0004\u0001\u0000\u0000\u0000"+
		"-.\u0005\f\u0000\u0000.\u0006\u0001\u0000\u0000\u0000/0\u0005\u8000\ufeff"+
		"\u0000\u00000\b\u0001\u0000\u0000\u000012\u0007\u0000\u0000\u00002\n\u0001"+
		"\u0000\u0000\u000039\u0003\u0001\u0000\u000049\u0003\u0003\u0001\u0000"+
		"59\u0003\u0005\u0002\u000069\u0003\u0007\u0003\u000079\u0003\t\u0004\u0000"+
		"83\u0001\u0000\u0000\u000084\u0001\u0000\u0000\u000085\u0001\u0000\u0000"+
		"\u000086\u0001\u0000\u0000\u000087\u0001\u0000\u0000\u00009\f\u0001\u0000"+
		"\u0000\u0000:;\u0005\n\u0000\u0000;\u000e\u0001\u0000\u0000\u0000<=\u0005"+
		"\r\u0000\u0000=\u0010\u0001\u0000\u0000\u0000>?\u0005\u2028\u0000\u0000"+
		"?\u0012\u0001\u0000\u0000\u0000@A\u0005\u2029\u0000\u0000A\u0014\u0001"+
		"\u0000\u0000\u0000BG\u0003\r\u0006\u0000CG\u0003\u000f\u0007\u0000DG\u0003"+
		"\u0011\b\u0000EG\u0003\u0013\t\u0000FB\u0001\u0000\u0000\u0000FC\u0001"+
		"\u0000\u0000\u0000FD\u0001\u0000\u0000\u0000FE\u0001\u0000\u0000\u0000"+
		"G\u0016\u0001\u0000\u0000\u0000HP\u0003\r\u0006\u0000IP\u0003\u000f\u0007"+
		"\u0000JP\u0003\u0011\b\u0000KP\u0003\u0013\t\u0000LM\u0003\u000f\u0007"+
		"\u0000MN\u0003\r\u0006\u0000NP\u0001\u0000\u0000\u0000OH\u0001\u0000\u0000"+
		"\u0000OI\u0001\u0000\u0000\u0000OJ\u0001\u0000\u0000\u0000OK\u0001\u0000"+
		"\u0000\u0000OL\u0001\u0000\u0000\u0000P\u0018\u0001\u0000\u0000\u0000"+
		"QR\u0005/\u0000\u0000RS\u0005*\u0000\u0000SU\u0001\u0000\u0000\u0000T"+
		"V\u0003\u001b\r\u0000UT\u0001\u0000\u0000\u0000UV\u0001\u0000\u0000\u0000"+
		"VW\u0001\u0000\u0000\u0000WX\u0005*\u0000\u0000XY\u0005/\u0000\u0000Y"+
		"\u001a\u0001\u0000\u0000\u0000Z\\\u0003\u001f\u000f\u0000[]\u0003\u001b"+
		"\r\u0000\\[\u0001\u0000\u0000\u0000\\]\u0001\u0000\u0000\u0000]^\u0001"+
		"\u0000\u0000\u0000^`\u0005*\u0000\u0000_a\u0003\u001d\u000e\u0000`_\u0001"+
		"\u0000\u0000\u0000`a\u0001\u0000\u0000\u0000a\u001c\u0001\u0000\u0000"+
		"\u0000bd\u0003!\u0010\u0000ce\u0003\u001b\r\u0000dc\u0001\u0000\u0000"+
		"\u0000de\u0001\u0000\u0000\u0000ef\u0001\u0000\u0000\u0000fh\u0005*\u0000"+
		"\u0000gi\u0003\u001d\u000e\u0000hg\u0001\u0000\u0000\u0000hi\u0001\u0000"+
		"\u0000\u0000i\u001e\u0001\u0000\u0000\u0000jk\b\u0001\u0000\u0000k \u0001"+
		"\u0000\u0000\u0000lm\b\u0002\u0000\u0000m\"\u0001\u0000\u0000\u0000no"+
		"\u0005/\u0000\u0000op\u0005/\u0000\u0000pr\u0001\u0000\u0000\u0000qs\u0003"+
		"%\u0012\u0000rq\u0001\u0000\u0000\u0000rs\u0001\u0000\u0000\u0000s$\u0001"+
		"\u0000\u0000\u0000tv\u0003\'\u0013\u0000uw\u0003%\u0012\u0000vu\u0001"+
		"\u0000\u0000\u0000vw\u0001\u0000\u0000\u0000w&\u0001\u0000\u0000\u0000"+
		"xy\b\u0003\u0000\u0000y(\u0001\u0000\u0000\u0000\u000b\u00008FOU\\`dh"+
		"rv\u0000";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}