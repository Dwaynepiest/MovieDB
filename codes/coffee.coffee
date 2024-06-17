# CoffeeScript voorbeeld: een eenvoudige ToDo-lijst applicatie

# Definieer een taak met een naam en voltooid status
class Task
  constructor: (@name, @completed = false) ->
  
  # Markeer de taak als voltooid
  complete: ->
    @completed = true

  # Markeer de taak als onvoltooid
  incomplete: ->
    @completed = false

  # Verkrijg de taak details
  details: ->
    "Task: #{@name}, Completed: #{@completed}"

# Definieer een ToDo-lijst
class ToDoList
  constructor: ->
    @tasks = []

  # Voeg een taak toe aan de lijst
  addTask: (task) ->
    @tasks.push task

  # Verwijder een taak van de lijst
  removeTask: (taskName) ->
    @tasks = @tasks.filter (task) -> task.name isnt taskName

  # Verkrijg de lijst van onvoltooide taken
  incompleteTasks: ->
    task for task in @tasks when not task.completed

  # Verkrijg de lijst van voltooide taken
  completedTasks: ->
    task for task in @tasks when task.completed

  # Verkrijg de details van alle taken
  listDetails: ->
    task.details() for task in @tasks

# Maak een nieuwe ToDo-lijst
myList = new ToDoList()

# Voeg taken toe aan de lijst
myList.addTask(new Task("Koffie zetten"))
myList.addTask(new Task("E-mails beantwoorden"))
myList.addTask(new Task("Code schrijven"))

# Markeer de eerste taak als voltooid
myList.tasks[0].complete()

# Toon de details van alle taken
console.log task for task in myList.listDetails()

# Toon de details van voltooide taken
console.log "Voltooide taken:"
console.log task for task in myList.completedTasks()

# Toon de details van onvoltooide taken
console.log "Onvoltooide taken:"
console.log task for task in myList.incompleteTasks()
