;(function(root) {
  var extend = function(one, two) {
    for(var prop in two) {
      one[prop] = two[prop]
    }
    return one
  }

  var Program = function() {}
  var legacyCreator = function(name, command, logo, exec) {
    var template = {
      container: document.createElement("div"),
      logo: {
        img: document.createElement("img"),
        build: function() {}
      },
      info: {
        container: document.createElement("div"),
        processes: document.createElement("div"),
        memmory: document.createElement("div"),
        build : function() {}
      },
      start: {
        button: document.createElement("input"),
        build: function() {}
      },
      build: function() {},
      search: function() {}
    }
    var instance = extend(new Program(), template)
    
    instance.search = function(list) {
      var memmory = 0;
      list = list.filter(function(proc) {
        var regex = new RegExp(command, "gi")
        var flag = regex.test(proc.command)
        if(flag) {
          memmory += parseFloat(proc.memmory.replace(/ |kb|,/gi, ""))
        }
        return flag 
      })
      instance.info.processes.innerHTML = "Procesos: " + list.length
      instance.info.memmory.innerHTML = "RAM: " + (memmory*0.001).toFixed(2) + " MB"
    }
    
    instance.logo.build = function() {
      var wrap = document.createElement("div")
      wrap.className = "logoContainer"
      wrap.appendChild(extend(instance.logo.img, {
        id: "logo_" + name,
        src: logo,
        width: 100
      }))
      return wrap 
    }
    
    instance.info.build = function() {
      instance.info.container.id = name + "Info"
      instance.info.container.className = "info"
      instance.info.container.appendChild(instance.info.processes)
      instance.info.container.appendChild(instance.info.memmory)
      return instance.info.container
    }
    
    instance.start.build = function() {
      return extend(instance.start.button, {
        type: "button",
        value: "Iniciar",
        onclick: function(){}
      })
    }
    
    instance.build = function() {
      instance.container.id = name + "Container"
      instance.container.className = "program"
      instance.container.appendChild(instance.logo.build())
      instance.container.appendChild(instance.info.build())
      instance.container.appendChild(instance.start.build())
      instance.container.appendChild(function(){
        var element = document.createElement("div")
        element.classList.add("clear")
        return element
      }())
      
      return instance.container
    }
    
    return instance
  }
  
  var niceCreator = function(obj) {
    var instance = legacyCreator(obj.name, obj.command || obj.name, obj.logo, obj.exec)
    if(obj.start) {
      instance.start.build = function() {
        return extend(instance.start.button, {
          type: "button",
          value: "Iniciar",
          onclick: obj.start
        })
      }
    } else {
      instance.start.build = function() { 
        return document.createElement("div")
      }
    }
    return instance
  }
  
  Program.createProgram = function(name, command, logo, exec) {
    if(name.constructor.name === "Object") {
      return niceCreator(name)
    }
    else {
      return legacyCreator(name, command, logo, exec)
    }
  }
  
  root.Program = Program
}(this));