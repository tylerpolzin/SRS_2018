require 'test_helper'

class TasksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @task = tasks(:one)
  end

  test "should get index" do
    get tasks_url
    assert_response :success
  end

  test "should get new" do
    get new_task_url
    assert_response :success
  end

  test "should create task" do
    assert_difference('Task.count') do
      post tasks_url, params: { task: { active: @task.active, completion_date: @task.completion_date, due_date: @task.due_date, initiated_by: @task.initiated_by, initiated_for: @task.initiated_for, status: @task.status, task_type: @task.task_type } }
    end

    assert_redirected_to task_url(Task.last)
  end

  test "should show task" do
    get task_url(@task)
    assert_response :success
  end

  test "should get edit" do
    get edit_task_url(@task)
    assert_response :success
  end

  test "should update task" do
    patch task_url(@task), params: { task: { active: @task.active, completion_date: @task.completion_date, due_date: @task.due_date, initiated_by: @task.initiated_by, initiated_for: @task.initiated_for, status: @task.status, task_type: @task.task_type } }
    assert_redirected_to task_url(@task)
  end

  test "should destroy task" do
    assert_difference('Task.count', -1) do
      delete task_url(@task)
    end

    assert_redirected_to tasks_url
  end
end
