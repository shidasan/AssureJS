var default_success_callback = function (result) {
};

var default_error_callback = function (req, stat, err) {
    alert("ajax error");
};

var ServerAPI = (function () {
    function ServerAPI(basepath) {
        this.uri = basepath + "/api/1.0/";
    }
    ServerAPI.prototype.RemoteCall = function (method, params) {
        var cmd = {
            jsonrpc: "2.0",
            method: method,
            id: 1,
            params: params
        };
        var async = callback != null;
        var callback = default_success_callback;
        var error_callback = default_error_callback;
        var res = $.ajax({
            type: "POST",
            url: this.uri,
            async: async,
            data: JSON.stringify(cmd),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                callback(response.result);
            },
            error: error_callback
        });
        if (!async) {
            return JSON.parse(res.responseText).result;
        }
    };

    ServerAPI.prototype.GetCase = function (ProjectName, CaseId) {
        return this.RemoteCall("getDCase", { dcaseId: CaseId });
    };

    ServerAPI.prototype.SearchDCase = function (pageIndex, tags) {
        if (tags == null) {
            tags = [];
        }
        try  {
            return this.RemoteCall("searchDCase", { page: pageIndex, tagList: tags });
        } catch (e) {
            return [];
        }
    };

    ServerAPI.prototype.CreateDCase = function (name, tree) {
        return this.RemoteCall("createDCase", {
            dcaseName: name,
            contents: tree
        });
    };

    ServerAPI.prototype.GetCommitList = function (dcaseId) {
        return this.RemoteCall("getCommitList", { dcaseId: dcaseId }).commitList;
    };

    ServerAPI.prototype.GetTagList = function () {
        return this.RemoteCall("getTagList", {});
    };

    ServerAPI.prototype.Commit = function (tree, msg, commitId) {
        return this.RemoteCall("commit", {
            contents: tree,
            commitMessage: msg,
            commitId: commitId
        }).commitId;
    };

    ServerAPI.prototype.EditDCase = function (dcaseId, name) {
        return this.RemoteCall("editDCase", {
            dcaseId: dcaseId,
            dcaseName: name
        });
    };

    ServerAPI.prototype.DeleteDCase = function (dcaseId) {
        return this.RemoteCall("deleteDCase", { dcaseId: dcaseId });
    };

    ServerAPI.prototype.GetNodeTree = function (commitId) {
        return JSON.parse(this.RemoteCall("getNodeTree", { commitId: commitId }).contents);
    };

    ServerAPI.prototype.SearchNode = function (text) {
        return this.RemoteCall("searchNode", { text: text }).searchResultList;
    };

    ServerAPI.prototype.SearchDCaseHistory = function (dcaseId, text) {
        return this.RemoteCall("searchDCaseHistory", { dcaseId: dcaseId, text: text });
    };
    return ServerAPI;
})();
