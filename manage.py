import os
import unittest

from flask_script import Manager

from backend.app.shorty import create_app

app = create_app()

app.app_context().push()

manager = Manager(app)


@manager.command
def run():
    app.run(host="localhost", port=5000)


@manager.command
def test():
    """Runs the unit tests."""
    tests = unittest.TestLoader().discover('app/test', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1


if __name__ == '__main__':
    manager.run()
