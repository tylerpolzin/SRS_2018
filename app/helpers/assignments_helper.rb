module AssignmentsHelper
  def scaffolds_1
    [
      ["General", "All"],
      ["Login Issues", "Devise"],
      ["Dashboard", "Dashboard"],
      ["Products", "Products"],
      ["Parts", "Parts"],
      ["Inventory Adjustments", "Stock Movements"],
      # ["Uploads", "Uploads"],
    ]
  end
  
  def scaffolds_2
    [
      ["Users", "Users"],
      ["Assignments", "Assignments"],
      ["Database", "Database"]
    ]
  end
end
