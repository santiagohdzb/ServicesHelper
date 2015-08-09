/**
 * 
 * Jamesoft (c) 2015
 * 
 */
;(function() {
  var ps = require('ps-node'),
      ChildProcess = require('child_process'),
      spawn = ChildProcess.spawn,
      CMD = spawn('cmd')
  
  var lookup = function(fn) {    
    ps.lookup({}, function(err, resultList) {
      if (err) throw new Error(err)
      fn(resultList)
    })
  }
  
  var init = function(apps, wrapper) {
    wrapper = document.createElement("div")
    wrapper.id = "processWrapper"
    document.body.appendChild(wrapper)
    
    for(var app in apps) 
      wrapper.appendChild(apps[app].build())
        
    setInterval(function() {
      lookup(function(list) {
        for(var app in apps) 
          apps[app].search(list)
      })
    }, 500)
  }

  document.addEventListener("DOMContentLoaded", function() {
    init({
      chrome: Program.createProgram({
        name: "chrome",
        logo: "img/chrome.png", 
        start: function() {
          console.log("attempting to start")
          CMD.stdin.write('start chrome.exe -p "santiago" \n')
          CMD.stdin.end()
        }
      }),
      apache: Program.createProgram({
        name: "httpd",
        logo: "img/apache.jpg"
      }),
      mysqld: Program.createProgram({
        name: "mysqld",
        logo: "img/mysql.jpg"
      }),
      sqlserver: Program.createProgram({
        name: "mssqlserver",
        command: "sqlservr|sqlbrowser|MsDtsSrvr|sqlwriter|SQLAGENT",
        logo: "img/sqlserver.png"
      }),
      oracledatabase: Program.createProgram({
        name: "mssqlserver",
        command: "OraVSSW|nmesrvc|extjob|omtsreco|TNSLSNR|ORACLE",
        logo: "img/oracledatabase.png"
      }),
      hamachi: Program.createProgram({
        name: "hamachi",
        command: "hamachi|LMIGuardianSvc",
        logo: "img/hamachi.png"
      })
    })
  })

}())