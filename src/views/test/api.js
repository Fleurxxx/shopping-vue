import api from "@/api";
import qs from "qs";

let personReq = {};

personReq.addPerson = async (form) => {
    let res = await api.post("person", form);
    return res;
};

personReq.getPeople4Select = async () => {
    let res = await api.get("people/option");
    return res;
};

personReq.updatePerson = async (form) => {
    let res = await api.put("person", form);
    return res;
};

personReq.getPeople = async (query) => {
    let res = await api.get("people?", qs.stringify(query));
    return res;
};

personReq.getPerson = async (personId) => {
    let res = await api.get("person/" + personId);
    return res;
};

personReq.deletePerson = async (personId) => {
    let res = await api.delete("person/" + personId);
    return res;
};

let projectReq = {};

projectReq.addProject = async (form) => {
    let res = await api.post("project", form);
    return res;
};

projectReq.getProjects = async (query) => {
    let res = await api.get("projects?" + qs.stringify(query));
    return res;
};

projectReq.getProject = async (projectId) => {
    let res = await api.get("project/" + projectId);
    return res;
};

projectReq.deleteProject = async (projectId) => {
    let res = await api.delete("project/" + projectId);
    return res;
};

projectReq.tempSaveProject = async (form) => {
    let res = await api.post("project/add/temp-save", form);
    return res;
};

projectReq.getTempSaveProject = async () => {
    let res = await api.get("project/add/temp-save");
    return res;
};

let subjectReq = {};

subjectReq.getSubjects = async () => {
    let res = await api.get("subjects");
    return res;
};

let positionReq = {};

positionReq.getPositions = async () => {
    let res = await api.get("positions");
    return res;
};

let progressReq = {};

progressReq.addStepProgress = async (form) => {
    let res = await api.post("progress", form);
    return res;
};

progressReq.updateStepProgress = async (form) => {
    let res = await api.post("progress", form);
    return res;
};

progressReq.getProgresses = async (form) => {
    let url = "progress/" + form.step + "/" + form.stepDataId;
    let res = await api.get(url);
    return res;
};

progressReq.deleteProgress = async (form) => {
    let url = "progress/" + form.step + "/" + form.progressId;
    let res = await api.delete(url);
    return res;
};

let userReq = {};

userReq.login = async (form) => {
    let url = "user/login";
    let res = await api.post(url, form);
    return res;
};

userReq.register = async (form) => {
    let url = "user/register";
    let res = await api.post(url, form);
    return res;
};

userReq.updateUser = async (form) => {
    let url = "user";
    let res = await api.put(url, form);
    return res;
};

userReq.updatePassword = async (form) => {
    let url = "user/password";
    let res = await api.put(url, form);
    return res;
};

export { personReq, positionReq, subjectReq, projectReq, progressReq, userReq };
