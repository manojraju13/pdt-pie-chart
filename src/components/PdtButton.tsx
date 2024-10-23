import { Button } from "@mui/material";

function PdtButton({disabled=true, name="", onclick=()=>{}}) {
  return <Button disabled={disabled} variant="contained" onClick={()=> {onclick()}}>Run Report</Button>;
}

export default PdtButton;
