<%@ Page Language="C#" ContentType="application/json" %>

<%
    DBDataContext DB = new DBDataContext();

    //Initialize result type
    System.Linq.IQueryable<string> Instr = null;

    //Retrieve GET parameters
    var pname = Request.QueryString["pname"];
    var disc = Request.QueryString["disc"];

    //Build search specific query depending on search terms given
    if (pname == null && disc == null)
    {
        //Return empty array if no search terms received
        Response.Write("[]");
        return;
    }
    else if (string.IsNullOrEmpty(pname) && string.IsNullOrEmpty(disc))
    {
        Instr = DB.InstructorSubjects.Where(I => I.Name == pname && I.Subject == disc).Select(I => "{\"ubcid\":\"" + I.UBCId + "\", \"name\":\"" + I.Name + "\", \"disc\":\"" + I.Subject + "\"}");
    }
    else if (string.IsNullOrEmpty(pname))
    {
        Instr = DB.InstructorSubjects.Where(I => I.Name == pname).Select(I => "{\"ubcid\":\"" + I.UBCId + "\", \"name\":\"" + I.Name + "\", \"disc\":\"" + I.Subject + "\"}");
    }
    else if (string.IsNullOrEmpty(disc))
    {
        Instr = DB.InstructorSubjects.Where(I => I.Subject == disc).Select(I => "{\"ubcid\":\"" + I.UBCId + "\", \"name\":\"" + I.Name + "\", \"disc\":\"" + I.Subject + "\"}");
    }

    if (Instr == null)
    {
        Response.Write("[]");
        return;
    }

    //Output results as JSON array of {ubcid, name, discipline} objects
    Response.Write("[");
    Response.Write(string.Join(",", Instr));
    Response.Write("]");

%>