(function() {

    var app = angular.module('cv', ['cv-sections']);

    // ----------- CV Controller
    app.controller('CurriculumCtrl', ['$http', '$log', '$filter',
        function($http, $log, $filter) {

            var cv = this;
            cv.informations = {};

            $http.get('cv-data.json').
            success(function(data) {
                cv.informations = data;

                var orderBy = $filter('orderBy');
                var orderedExperiences = [];

                orderedExperiences = orderBy(cv.informations.experiences, '-to_date');
                cv.position = orderedExperiences[0].job_position;
                cv.current_company_name = orderedExperiences[0].company.name;
                cv.current_company_url = orderedExperiences[0].company.url;
            }).
            error(function(data, status, headers, config) {
                $log.error(status);
            });
			
			//------------------------------EDIT INFO---------------------------------
			//Edit Name
			cv.infoName_disabled = false;
			cv.infoName_cancel = function() {
				cv.infoName_disabled = false;
			};  
			cv.infoName_save = function() {
				if(angular.equals(cv.infoName_text, ""))
					cv.infoName_text = cv.informations.personal_informations.name;
				cv.informations.personal_informations.name = cv.infoName_text;
				cv.infoName_cancel();
			};
			
			cv.infoName_enabled = function() {
				cv.infoName_disabled = true;
				cv.infoName_text = cv.informations.personal_informations.name;
			};
			
			//Edit Current
			cv.infoCurrent_disabled = false;
			cv.infoCurrent_cancel = function() {
				cv.infoCurrent_disabled = false;
			};  
			cv.infoCurrent_save = function() {
				if(angular.equals(cv.infoCurrent_text, ""))
					cv.infoCurrent_text = cv.position;
				cv.position = cv.infoCurrent_text;
				cv.infoCurrent_cancel();
			};
			
			cv.infoCurrent_enabled = function() {
				cv.infoCurrent_disabled = true;
				cv.infoCurrent_text = cv.position;
			};
			
			//Edit Country
			cv.infoCountry_disabled = false;
			cv.infoCountry_cancel = function() {
				cv.infoCountry_disabled = false;
			};  
			cv.infoCountry_save = function() {
				if(angular.equals(cv.infoCountry_text, ""))
					cv.infoCountry_text = cv.informations.personal_informations.country;
				cv.informations.personal_informations.country = cv.infoCountry_text;
				cv.infoCountry_cancel();
			};
			
			cv.infoCountry_enabled = function() {
				cv.infoCountry_disabled = true;
				cv.infoCountry_text = cv.informations.personal_informations.country;
			};
			
			//Edit Email
			cv.infoEmail_disabled = false;
			cv.infoEmail_cancel = function() {
				cv.infoEmail_disabled = false;
			};  
			cv.infoEmail_save = function() {
				if(angular.equals(cv.infoEmail_text, ""))
					cv.infoEmail_text = cv.informations.personal_informations.email;
				cv.informations.personal_informations.email = cv.infoEmail_text;
				cv.infoEmail_cancel();
			};
			
			cv.infoEmail_enabled = function() {
				cv.infoEmail_disabled = true;
				cv.infoEmail_text = cv.informations.personal_informations.email;
			};
			
			//Edit Company
			cv.infoCompany_disabled = false;
			cv.infoCompany_cancel = function() {
				cv.infoCompany_disabled = false;
			};  
			cv.infoCompany_save = function() {
				if(angular.equals(cv.infoCompany_text, ""))
					cv.infoCompany_text = cv.current_company_name;
				cv.current_company_name = cv.infoCompany_text;
				cv.infoCompany_cancel();
			};
			
			cv.infoCompany_enabled = function() {
				cv.infoCompany_disabled = true;
				cv.infoCompany_text = cv.current_company_name;
			};
			
			//Edit Phone
			cv.infoPhone_disabled = false;
			cv.infoPhone_cancel = function() {
				cv.infoPhone_disabled = false;
			};  
			cv.infoPhone_save = function() {
				if(angular.equals(cv.infoPhone_text, ""))
					cv.infoPhone_text = cv.informations.personal_informations.phone_number;
				cv.informations.personal_informations.phone_number = cv.infoPhone_text;
				cv.infoPhone_cancel();
			};
			
			cv.infoPhone_enabled = function() {
				cv.infoPhone_disabled = true;
				cv.infoPhone_text = cv.informations.personal_informations.phone_number;
			};
			
			//------------------------EDIT SUMMARY--------------------------
			
			cv.Summary_disabled = false;
			cv.Summary_cancel = function() {
				cv.Summary_disabled = false;
			};  
			cv.Summary_save = function() {
				if(angular.equals(cv.Summary_text, ""))
					cv.Summary_text = cv.informations.summary;
				cv.informations.summary = cv.Summary_text;
				cv.Summary_cancel();
			};
			
			cv.Summary_enabled = function() {
				cv.Summary_disabled = true;
				cv.Summary_text = cv.informations.summary;
			};
			
			//-----------------------EDIT EXPERIENCE------------------------
			cv.company_Name = false;
			cv.from_date = false;
			cv.job_description = false;
			cv.job_position = false;
			cv.to_date = false;
			cv.addExp = false;
			cv.editExp = false;
			var tempExp = null;
			
			cv.ExpAdd = function(){
				cv.company_Name = true;
				cv.from_date = true;
				cv.job_description = true;
				cv.job_position = true;
				cv.to_date = true;
				cv.addExp = true;	

				cv.company_Name_text = "";
				cv.from_date_text = "";
				cv.job_description_text = "";
				cv.job_position_text = "";
				cv.to_date_text = "";
			};
			
			cv.ExpEdit = function(data){
				cv.company_Name = true;
				cv.from_date = true;
				cv.job_description = true;
				cv.job_position = true;
				cv.to_date = true;
				cv.editExp = true;
				tempExp = data;

				cv.company_Name_text = data.company.name;
				cv.from_date_text = data.from_date;
				cv.job_description_text = data.job_description;
				cv.job_position_text = data.job_position;
				cv.to_date_text = data.to_date;
			};
			
			cv.ExpAddCancel = function(){				
				cv.company_Name = false;
				cv.from_date = false;
				cv.job_description = false;
				cv.job_position = false;
				cv.to_date = false;
				cv.addExp = false;
			};
			
			cv.ExpEditCancel = function(){
				cv.company_Name = false;
				cv.from_date = false;
				cv.job_description = false;
				cv.job_position = false;
				cv.to_date = false;
				cv.editExp = false;			
			};
			
			cv.ExpAddSave = function(){
				data = {
						'company': {
										'location': "",
										'name': cv.company_Name_text,
										'url': ""
									},
						'from_date': cv.from_date_text,
						'job_description': cv.job_description_text,
						'job_position': cv.job_position_text,
						'to_date': cv.to_date_text
					};
					cv.informations.experiences.push(data);
					
					cv.ExpAddCancel();
			};
			
			cv.ExpEditSave = function(){
				tempExp.company.name = cv.company_Name_text;
				tempExp.from_date = cv.from_date_text;
				tempExp.job_description = cv.job_description_text;
				tempExp.job_position = cv.job_position_text;
				tempExp.to_date = cv.to_date_text;

				cv.ExpEditCancel();
			};
			
			
			//----------------------------EDIT PROJECT----------------------------
			
			//Add Project
			cv.projectDescription_disabled = false;
			cv.projectFromDate_disabled = false;
			cv.projectToDate_disabled = false;
			cv.projectName_disabled = false;
			cv.projectEdit = false;
			cv.projectAdd = false;
			var tempproject = null;
			
			cv.Project_Add = function() {
				cv.projectDescription_disabled = true;
				cv.projectFromDate_disabled = true;
				cv.projectToDate_disabled = true;
				cv.projectName_disabled = true;
				cv.projectAdd = true;
				
				cv.projectName_text = "";
				cv.projectDescription_text = "";
				cv.projectToDate_text = "";
				cv.projectFromDate_text = "";
			
			};
			cv.Project_cancel = function() {
				cv.projectDescription_disabled = false;
				cv.projectFromDate_disabled = false;
				cv.projectToDate_disabled = false;
				cv.projectName_disabled = false;
				cv.projectAdd = false;
			};
			cv.Project_save = function() {
				if(angular.equals(cv.projectName_text, ""))
					cv.Project_cancel();
				else{
					data = {
						'name': cv.projectName_text,						
						'description': cv.projectDescription_text,
						'to_date': cv.projectToDate_text,
						'from_date': cv.projectFromDate_text,
						'url': "http://"
					};
					cv.informations.projects.push(data);
					
					cv.Project_cancel();
				}
			};
			
			cv.Project_Edit = function(data) {
				cv.projectDescription_disabled = true;
				cv.projectFromDate_disabled = true;
				cv.projectToDate_disabled = true;
				cv.projectName_disabled = true;
				cv.projectEdit = true;
				tempproject = data;
				
				cv.projectName_text = data.name;
				cv.projectFromDate_text = data.from_date;
				cv.projectToDate_text = data.to_date;
				cv.projectDescription_text = data.description;
			};
			cv.Project_Editcancel = function() {
				cv.projectDescription_disabled = false;
				cv.projectFromDate_disabled = false;
				cv.projectToDate_disabled = false;
				cv.projectName_disabled = false;
				cv.projectEdit = false;
			};
			cv.Project_Editsave = function() {
				if(angular.equals(cv.projectName_text, "") || angular.equals(cv.projectDescription_text, "") || angular.equals(cv.projectFromDate_text, "") || angular.equals(cv.projectToDate_text, "")) {
					cv.projectName_text = data.name;
					cv.projectFromDate_text = data.from_date;
					cv.projectToDate_text = data.to_date;
					cv.projectDescription_text = data.description;
				}
				tempproject.name = cv.projectName_text;
				tempproject.from_date = cv.projectFromDate_text;
				tempproject.to_date = cv.projectToDate_text;
				tempproject.description = cv.projectDescription_text;
				
				cv.Project_Editcancel();
			};			
			
			//--------------------------EDIT SKILL-------------------------------
			cv.nameSkill = false;
			cv.levelSkill = false;
			cv.addSkill = false;
			cv.editSkill = false;
			var temp = null;
			
			
			cv.SkillAdd = function(){
				cv.nameSkill = true;
				cv.levelSkill = true;
				cv.addSkill = true;	

				cv.skillLevel_text = "";					
				cv.skillName_text = "";
			};
			
			cv.SkillEdit = function(data){
				cv.nameSkill = true;
				cv.levelSkill = true;
				cv.editSkill = true;
				temp = data;

				cv.skillLevel_text = data.level;					
				cv.skillName_text = data.name;
			};
			
			cv.SkillAddCancel = function(){				
				cv.nameSkill = false;
				cv.levelSkill = false;
				cv.addSkill = false;
			};
			
			cv.SkillEditCancel = function(){
				cv.nameSkill = false;
				cv.levelSkill = false;
				cv.editSkill = false;				
			};
			
			cv.SkillAddSave = function(){
				data = {
						'level': cv.skillLevel_text,						
						'name': cv.skillName_text
					};
					cv.informations.skills.push(data);
					
					cv.SkillAddCancel();
			};
			
			cv.SkillEditSave = function(){
				temp.level = cv.skillLevel_text;						
				temp.name = cv.skillName_text;

				cv.SkillEditCancel();
			};
			
			
			//------------------------EDIT EDUCATION----------------------
			cv.degreeEdu = false;
			cv.fromDateEdu = false;
			cv.schoolNameEdu = false;
			cv.toDateEdu = false;
			cv.addEdu = false;
			cv.editEdu = false;
			var tempEdu = null;
			
			
			cv.EduAdd = function(){
				cv.degreeEdu = true;
				cv.fromDateEdu = true;
				cv.schoolNameEdu = true;
				cv.toDateEdu = true;
				cv.addEdu = true;
				
				cv.degreeEdu_text = "";
				cv.fromDateEdu_text = "";
				cv.schoolNameEdu_text = "";					
				cv.toDateEdu_text = "";
			};
			
			cv.EduEdit = function(data){
				cv.degreeEdu = true;
				cv.fromDateEdu = true;
				cv.schoolNameEdu = true;
				cv.toDateEdu = true;
				cv.editEdu = true;
				tempEdu = data;
				
				cv.degreeEdu_text = data.degree;
				cv.fromDateEdu_text = data.from_date;
				cv.schoolNameEdu_text = data.school_name;					
				cv.toDateEdu_text = data.to_date;
			};
			
			cv.EduAddCancel = function(){				
				cv.degreeEdu = false;
				cv.fromDateEdu = false;
				cv.schoolNameEdu = false;
				cv.toDateEdu = false;
				cv.addEdu = false;
			};
			
			cv.EduEditCancel = function(){
				cv.degreeEdu = false;
				cv.fromDateEdu = false;
				cv.schoolNameEdu = false;
				cv.toDateEdu = false;
				cv.editEdu = false;			
			};
			
			cv.EduAddSave = function(){
				data = {
						'degree': cv.degreeEdu_text,						
						'from_date': cv.fromDateEdu_text,
						'school_name': cv.schoolNameEdu_text,
						'to_date': cv.toDateEdu_text
					};
					cv.informations.education.push(data);
					
					cv.EduAddCancel();
			};
			
			cv.EduEditSave = function(){
				tempEdu.degree = cv.degreeEdu_text;						
				tempEdu.from_date = cv.fromDateEdu_text;
				tempEdu.school_name = cv.schoolNameEdu_text;
				tempEdu.to_date = cv.toDateEdu_text;

				cv.EduEditCancel();
			};
        }
    ]);
	
	

})();