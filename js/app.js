/**
 * 
 * Jamesoft (c) 2015
 * 
 */
;(function(){
  var ps = require('ps-node')
  
  var lookup = function(name, cbk) {
    ps.lookup({command: name}, function(err, resultList) {
      if (err)
        throw new Error(err)
      cbk(resultList)
    })
  }
  
  var createInterfaz = function() {
    var body = document.body,
        processWrapper = document.createElement("div"),
        controls = document.createElement("div"),
        results = document.createElement("table")
    
    processWrapper.id = "processWrapper"
    controls.id = "processControls"
    results.id = "processResults"
    
    var showProcesses = function(list) {
      var headers = ["PID", "NOMBRE"],
          thead = results.tHead,
          tbody = results.tBodies[0]
      
      thead.innerHTML = "<tr><th>"+headers.join("</th><th>")+"</th></tr>"
      tbody.innerHTML = ""
      
      list.forEach(function(proc) {
        if(proc)
          tbody.innerHTML += "" + 
            "<tr><td>" + 
              [proc.pid, proc.command].join("</td><td>") + 
            "</td></tr>"
      })
    }
    
    var initResultsTable = function() {
      results.appendChild(document.createElement("thead"))
      results.appendChild(document.createElement("tbody"))
    }
    
    var createControls = function() {
      var search = document.createElement("input"),
          button = document.createElement("input")      
          
      search.id = search.name = "processName"
      search.placeholder = "Nombre de proceso"
      button.id = "buscar"
      button.type = "button"
      button.value = "Buscar"
      button.addEventListener("click", function() {
        lookup(search.value, showProcesses)
      }, false)
      
      controls.appendChild(search)
      controls.appendChild(button)
    }
    
    createControls()
    initResultsTable()
    
    processWrapper.appendChild(controls)
    processWrapper.appendChild(results)
    body.appendChild(processWrapper)
  }
  
  document.addEventListener("DOMContentLoaded", function(){
    createInterfaz()
  }, false)

}())