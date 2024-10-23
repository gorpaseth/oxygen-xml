const PosInLine = {
	ON_EMPTY_LINE : 0,
	LINE_START : 1,
	LINE_END : 2,
	LINE_MIDDLE : 3
};

function getPosInLine(doc) {
	var cursor = doc.getCursor();
	var line = doc.getLine(cursor.line)
	if (line.length === 0) {
		return PosInLine.ON_EMPTY_LINE;
	} else if (cursor.ch === 0) {
		return PosInLine.LINE_START;
	} else if (cursor.ch === line.length) {
		return PosInLine.LINE_END
	} else {
		return PosInLine.LINE_MIDDLE;
	}
}
