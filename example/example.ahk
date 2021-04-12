Print(string){
	ListVars
	WinWait ahk_id %A_ScriptHwnd%
	ControlSetText Edit1, %string%
	WinWaitClose
}

Print("Example AHK Script Compiled successfully!")